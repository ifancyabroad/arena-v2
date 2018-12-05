import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  state: Subject<string> = new Subject<string>(); // State of the battle

  constructor() { }

  // Get log text
  getLog(attacker, defender, action, ability?, damage?, stat?, modifier?) {
    let log;
    if (ability) {
      const verb = ability['plane'] === 'physical' ? 'use' : 'cast';
      const moves = modifier >= 0 ? 'increases' : 'is reduced';
      log = {
        player: {
          attackHit: `You attack the ${defender.name} for ${damage} damage`,
          attackCrit: `CRITICAL HIT on the ${defender.name} for ${damage} damage`,
          use: `You ${verb} ${ability.name}`,
          hit: `${ability.name} hits ${defender.name} for ${damage} damage`,
          crit: `${ability.name} hits ${defender.name} for ${damage} damage, a CRITICAL HIT`,
          miss: `You miss the ${defender.name}`,
          buff: `Your ${stat} ${moves} by ${modifier}`,
          debuff: `${defender.name}'s ${stat} ${moves} by ${modifier}`
        },
        enemy: {
          attackHit: `${attacker.name} attacks you for ${damage} damage`,
          attackCrit: `${attacker.name} attacks you with a CRITICAL HIT for ${damage} damage`,
          use: `${attacker.name} ${verb}s ${ability.name}`,
          hit: `${ability.name} hits you for ${damage} damage`,
          crit: `${ability.name} hits you for ${damage} damage, a CRITICAL HIT`,
          miss: `${attacker.name} misses you`,
          buff: `${attacker.name}'s ${stat} ${moves} by ${modifier}`,
          debuff: `Your ${stat} ${moves} by ${modifier}`
        }
      };
    } else {
      log = {
        player: {
          victory: `You have slain the ${defender.name}!`,
          exp: `You gain ${defender.expValue} experience`,
          gold: `${defender.goldValue} gold earned`
        }
      };
    }
    return log[attacker.type][action];
  }

  // Check hit, crit and calculate damage
  getAttack(attacker, defender, plane, effect) {
    let damage;
    let action;
    if (plane === 'physical') {
      if (attacker.checkHit()) {
        damage = defender.checkResistance(attacker.getDamage(effect), defender.stats.armour.total);
        action = 'hit';
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
      action = 'hit';
    }
    return {state: action, damage: damage};
  }

  // Add or refresh buff/debuff effect
  getEffect(entity, effect, ability) {
    if (entity.effectActive()) {
      entity.refreshEffect(effect);
    } else {
      entity.addEffect(ability['name'], effect);
    }
  }
}
