import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { BattleService } from 'src/app/shared/services/battle.service';
import { PlayerService } from 'src/app/shared/services/player.service';
import { EnemyService } from 'src/app/shared/services/enemy.service';
import { fadein } from 'src/app/animations/fadein';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.scss'],
  animations: [fadein]
})
export class ArenaComponent implements OnInit {

  battleState = 'waiting'; // State of the fight
  combatLog: Object[] = []; // Store text in the combat log

  player; // Player object
  enemy; // Enemy object

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
      if (this.battleState === 'start') {
        this.resetArena();
      }
    });
  }

  // Check turn order and begin the round once input is received
  startRound(action) {
    if (this.player.initiative >= this.enemy.initiative) {
      this.turn(this.player, this.enemy, action);
      this.turn(this.enemy, this.player, action);
    } else {
      this.turn(this.enemy, this.player);
      this.turn(this.player, this.enemy, action);
    }
  }

  // Check if magical or physical attack and proceed accordingly
  turn(attacker, defender, action = this.enemy.getAction()) {
    if (action === 'physical') {
      this.getPhysicalAttack(attacker, defender);
    } else if (action === 'magical') {
      this.getMagicalAttack(attacker, defender);
    }
    if (this.checkDead(defender) && defender.type === 'enemy') {
      this.enemySlain();
    }
  }

  // Check hit, crit and calculate damage
  getPhysicalAttack(attacker, defender) {
    let damage;
    let action;
    if (attacker.checkHit()) {
      damage = defender.checkResistance(attacker.getDamage(attacker.stats.strength), defender.armour);
      action = 'attack';
      if (attacker.checkCrit()) {
        damage *= 2;
        action = 'crit';
      }
      defender.takeHit(damage);
    } else {
      action = 'miss';
    }
    this.logAction(attacker.type, action, damage);
  }

  // Calculate magical damage
  getMagicalAttack(attacker, defender) {
    const damage = defender.checkResistance(attacker.getDamage(attacker.stats.strength), defender.magicResistance);
    const action = 'spell';
    defender.takeHit(damage);
    this.logAction(attacker.type, action, damage);
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
  logAction(attacker, action, damage = 0) {
    const log = {
      player: {
        attack: `You attack the ${this.enemy.name} for ${damage} damage`,
        crit: `CRITICAL HIT on the ${this.enemy.name} for ${damage} damage`,
        spell: `Your spell hits the ${this.enemy.name} for ${damage} damage`,
        miss: `You miss the ${this.enemy.name}`,
        victory: `You have slain the ${this.enemy.name}!`,
        exp: `You gain ${this.enemy.expValue} experience`,
        gold: `${this.enemy.goldValue} gold earned`
      },
      enemy: {
        attack: `${this.enemy.name} attacks you for ${damage} damage`,
        crit: `${this.enemy.name} attacks you with a CRITICAL HIT for ${damage} damage`,
        spell: `${this.enemy.name}'s spell hits you for ${damage} damage`,
        miss: `${this.enemy.name} misses you`
      }
    };
    this.combatLog.unshift(log[attacker][action]);
  }

  // Rest the combat log
  resetArena() {
    this.combatLog.splice(0);
  }

  proceed() {
    this.nav.uiCard.next({ face: 'back', view: 'town', flip: true });
    this.nav.enemyCard.next({ flip: true });
  }

}
