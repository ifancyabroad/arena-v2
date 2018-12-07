import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { BattleService } from 'src/app/shared/services/battle.service';
import { PlayerService } from 'src/app/shared/services/player.service';
import { EnemyService } from 'src/app/shared/services/enemy.service';
import { fadein } from 'src/app/animations/fadein';
import { Player } from 'src/app/shared/classes/player';
import { Enemy } from 'src/app/shared/classes/enemy';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.scss'],
  animations: [fadein]
})
export class ArenaComponent implements OnInit {

  roundCounter = 1; // Track how many turns have passed

  battleState = 'waiting'; // State of the fight
  combatLog: Object[] = []; // Store text in the combat log

  player: Player; // Player object
  enemy: Enemy; // Enemy object

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

    this.bs.state.subscribe(state => {
      this.battleState = state;
      if (this.battleState === 'waiting') {
        this.resetArena();
      }
    });
  }

  // Check turn order and begin the round once input is received
  startRound(ability) {
    if (this.player.stats['initiative'].total >= this.enemy.stats['initiative'].total) {
      this.turn(this.player, this.enemy, ability);
      if (!this.checkDead(this.enemy)) {
        this.turn(this.enemy, this.player);
      }
    } else {
      this.turn(this.enemy, this.player);
      this.turn(this.player, this.enemy, ability);
      // if (!this.checkDead(this.player)) {
      //   this.turn(this.player, this.enemy, ability);
      // }
    }
    this.roundChecks();
  }

  // Check if magical or physical attack and proceed accordingly
  turn(attacker, defender, ability = this.enemy.getAction()) {
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
        turnLog.unshift(this.bs.getLog(attacker, defender, 'victory'));
        turnLog.unshift(this.bs.getLog(attacker, defender, 'exp'));
        turnLog.unshift(this.bs.getLog(attacker, defender, 'gold'));
        this.enemySlain();
      } else {
        this.playerSlain();
      }
    }

    this.logTurn(turnLog);
  }

  // Log text from the turn
  logTurn(turn) {
    this.combatLog.unshift(...turn);
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
    this.bs.state.next('won');
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
    this.roundCounter = 0;
    this.combatLog.splice(0);
  }

  proceed() {
    this.nav.uiCard.next({ face: 'back', view: 'town', flip: true });
    this.nav.enemyCard.next({ flip: true });
  }

}
