import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { BattleService } from 'src/app/shared/services/battle.service';
import { PlayerService } from 'src/app/shared/services/player.service';
import { EnemyService } from 'src/app/shared/services/enemy.service';
import { fadein } from 'src/app/animations/fadein';
import { Player } from 'src/app/shared/classes/player';
import { Enemy } from 'src/app/shared/classes/enemy';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.scss'],
  animations: [fadein]
})
export class ArenaComponent implements OnInit, OnDestroy {

  roundCounter = 1; // Track how many turns have passed
  turnCounter = 1; // Track which turn it is

  battleState: string; // State of the fight
  stateSubscription: Subscription; // Subscription to battle state
  combatLog: Array<string> = []; // Store text in the combat log

  player: Player; // Player object
  playerAbility: any; // Current ability
  enemy: Enemy; // Enemy object
  enemyAbility: any; // Current ability

  constructor(
    private nav: NavigationService,
    private bs: BattleService,
    private ps: PlayerService,
    private es: EnemyService
  ) { }

  ngOnInit() {
    this.player = this.ps.player;
    this.enemy = this.es.enemy;

    this.es.enemyCreated.subscribe(created => {
      if (created) {
        this.enemy = this.es.enemy;
      }
    });

    this.stateSubscription = this.bs.state.subscribe(state => this.handleState(state));
    this.handleState('start');
  }

  // Handle the different battle states
  handleState(state) {
    this.battleState = state;
    switch (this.battleState) {
      case 'start':
        this.resetArena();
        break;

      case 'waiting':
        this.roundChecks();
        break;

      case 'player-turn':
        this.turn(this.player, this.enemy, this.playerAbility);
        break;

      case 'enemy-turn':
        this.turn(this.enemy, this.player, this.enemyAbility);
        break;

      case 'victory':
        this.enemySlain();
        break;

      case 'defeat':
        this.playerSlain();
        break;
    }
  }

  // Check turn order and begin the round once input is received
  startTurn(ability) {
    this.playerAbility = ability;
    this.enemyAbility = this.enemy.getAction();
    if (this.player.stats['initiative'].total >= this.enemy.stats['initiative'].total) {
      this.bs.state.next('player-turn');
    } else {
      this.bs.state.next('enemy-turn');
    }
  }

  // Check if magical or physical attack and proceed accordingly
  turn(attacker, defender, ability) {
    let attack = {};
    const turnLog = [];
    attacker.useAbility(ability);
    turnLog.unshift(this.bs.getLog(attacker, defender, 'use', ability));

    ability['effects'].forEach(effect => {
      switch (effect['type']) {
        case 'damage':
          attack = this.bs.getAttack(attacker, defender, ability['plane'], effect);
          turnLog.unshift(this.bs.getLog(attacker, defender, attack['state'], ability, attack['damage']));
          break;

        case 'heal':
          if (attack['state'] !== 'miss') {
            this.bs.getHeal(attacker, effect);
            turnLog.unshift(this.bs.getLog(attacker, defender, effect.type, ability, effect.value));
          }
          break;

        case 'buff':
          if (attack['state'] !== 'miss' && attacker.effectHit(effect)) {
            this.bs.getEffect(attacker, effect, ability);
            for (let modifier of Object.keys(effect.modifiers)) {
              turnLog.unshift(this.bs.getLog(attacker, defender, effect.type, ability, 0, modifier, effect.modifiers[modifier]));
            }
          }
          break;

        case 'debuff':
          if (attack['state'] !== 'miss' && attacker.effectHit(effect)) {
            this.bs.getEffect(defender, effect, ability);
            for (let modifier of Object.keys(effect.modifiers)) {
              turnLog.unshift(this.bs.getLog(attacker, defender, effect.type, ability, 0, modifier, effect.modifiers[modifier]));
            }
          }
          break;
      }
    });

    if (this.checkDead(defender)) {
      if (defender.type === 'enemy') {
        this.turnCounter = 3; // Stop the turn cycle
        turnLog.unshift(this.bs.getLog(attacker, defender, 'victory'));
        turnLog.unshift(this.bs.getLog(attacker, defender, 'exp'));
        turnLog.unshift(this.bs.getLog(attacker, defender, 'gold'));
      } else {
        this.turnCounter = 4; // Stop the turn cycle
      }
    }

    this.endTurn(turnLog);
  }

  // Log text from the turn
  endTurn(turn) {
    let i = turn.length - 1;
    let timer = setInterval(() => {
      if (i >= 0) {
        this.combatLog.unshift(turn[i]);
        i--;
      } else {
        clearInterval(timer);
        this.toggleTurn();
      }
    }, 1000);
  }

  // Turn toggle
  toggleTurn() {
    if (this.turnCounter === 1) {
      this.turnCounter++;
      this.bs.state.next(this.battleState === 'player-turn' ? 'enemy-turn' : 'player-turn');
    } else if (this.turnCounter === 2) {
      this.turnCounter--;
      this.bs.state.next('waiting');
    } else if (this.turnCounter === 3) {
      this.bs.state.next('victory');
    } else if (this.turnCounter === 4) {
      this.bs.state.next('defeat');
    }
  }

  // Check if dead
  checkDead(entity) {
    return entity.dead();
  }

  // Enemy defeated
  enemySlain() {
    this.player.kills++;
    this.player.gold += this.enemy.goldValue;
    this.player.experienceGain(this.enemy.expValue);
  }

  // Player defeated
  playerSlain() {
    console.log('You died :(');
  }

  // End of round checks
  roundChecks() {
    this.roundCounter++;
    this.player.updateEffects();
    this.enemy.updateEffects();
  }

  // Rest the combat log
  resetArena() {
    this.playerAbility = {};
    this.enemyAbility = {};
    this.roundCounter = 1;
    this.turnCounter = 1;
    this.combatLog.splice(0);
    this.bs.state.next('waiting');
  }

  proceed() {
    this.nav.uiCard.next({ face: 'back', view: 'town', flip: true });
    this.nav.enemyCard.next({ flip: true });
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }

}
