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
    if (this.player['initiative'].total >= this.enemy['initiative'].total) {
      this.turn(this.player, this.enemy, ability);
      this.turn(this.enemy, this.player);
    } else {
      this.turn(this.enemy, this.player);
      this.turn(this.player, this.enemy, ability);
    }
    this.roundChecks();
  }

  // Check if magical or physical attack and proceed accordingly
  turn(attacker, defender, ability = this.enemy.getAction()) {
    let attack = {};
    ability['effects'].forEach(effect => {
      switch (effect['type']) {
        case 'damage':
          attack = this.getAttack(attacker, defender, ability['plane'], effect);
          this.logAction(attacker.type, attack['state'], ability, attack['damage']);
          break;

        case 'buff':
          if (attack['state'] !== 'miss') {
            attacker.addEffect(ability['name'], effect);
            this.logAction(attacker.type, effect.type, ability);
          }
          break;

        case 'debuff':
          if (attack['state'] !== 'miss') {
            defender.addEffect(ability['name'], effect);
            this.logAction(attacker.type, effect.type, ability);
          }
          break;
      }
    });

    if (this.checkDead(defender) && defender.type === 'enemy') {
      this.enemySlain();
    }
  }

  // Check hit, crit and calculate damage
  getAttack(attacker, defender, plane, effect) {
    let damage;
    let action;
    if (plane === 'physical') {
      if (attacker.checkHit()) {
        damage = defender.checkResistance(attacker.getDamage(effect), defender.stats.armour.total);
        action = 'attack';
        if (attacker.checkCrit()) {
          damage *= 2;
          action = 'crit';
        }
        defender.takeHit(damage);
      } else {
        action = 'miss';
      }
    } else if (plane === 'magical') {
      damage = defender.checkResistance(attacker.getDamage(effect), defender.stats.magicResistance.total);
      defender.takeHit(damage);
      action = 'spell';
    }
    return {state: action, damage: damage};
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
    this.logAction('player', 'victory');
    this.logAction('player', 'exp');
    this.logAction('player', 'gold');
    this.bs.state.next('won');
  }

  // Player defeated
  playerSlain() {

  }

  // Populate the combat log
  logAction(attacker, action, ability?, damage?) {
    let log;
    if (ability) {
      const withAbility = ability['name'] === 'Attack' ? ' ' : ` with ${ability['name']} `;
      const verb = ability['plane'] === 'physical' ? 'use' : 'cast';
      log = {
        player: {
          attack: `You attack the ${this.enemy.name}${withAbility}for ${damage} damage`,
          crit: `CRITICAL HIT on the ${this.enemy.name}${withAbility}for ${damage} damage`,
          spell: `You cast ${ability['name']} hitting the ${this.enemy.name} for ${damage} damage`,
          miss: `You miss the ${this.enemy.name}`,
          buff: `You ${verb} ${ability['name']}, increasing ${ability['modifier']}`,
          debuff: `You ${verb} ${ability['name']}, reducing the ${this.enemy.name}'s ${ability['modifier']}`
        },
        enemy: {
          attack: `${this.enemy.name} attacks you${withAbility}for ${damage} damage`,
          crit: `${this.enemy.name} attacks you${withAbility}and a CRITICAL HIT for ${damage} damage`,
          spell: `${this.enemy.name} casts ${ability['name']} for ${damage} damage`,
          miss: `${this.enemy.name} misses you`,
          buff: `${this.enemy.name} ${verb}s ${ability['name']}, increasing its ${ability['modifier']}`,
          debuff: `${this.enemy.name} ${verb}s ${ability['name']}, reducing your ${ability['modifier']}`
        }
      };
    } else {
      log = {
        player: {
          victory: `You have slain the ${this.enemy.name}!`,
          exp: `You gain ${this.enemy.expValue} experience`,
          gold: `${this.enemy.goldValue} gold earned`
        }
      };
    }
    this.combatLog.unshift(log[attacker][action]);
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
