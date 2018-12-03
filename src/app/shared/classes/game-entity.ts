import { UtilitiesService } from '../services/utilities.service';
import { buffer } from 'rxjs/operators';

export class GameEntity {

  dice = new UtilitiesService; // Get dice

  stats: Object; // Entity main stats
  activeEffects: Object[] = []; // Currently active effects
  maxHealth: Function; // Maximum health based on constitution
  currentHealth: number; // Current health of entity
  dead: Function; // Is entity dead
  hitChance: Function; // Hit chance based on dexterity
  critChance: Function; // Critical hit chance based on dexterity

  constructor(
    public name: string,
    public portrait: string,
    public st: Object,
    public abilities: Object[],
    public armour = 0,
    public magicResistance = 0
  ) {
    this.stats = {
      'strength': {
        name: 'Strength',
        description: 'How much damage your physical attacks do.',
        type: 'main',
        value: st['strength'],
        modifier: 0,
        battle: 0,
        get total(): number {
          return this.value + this.modifier + this.battle;
        }
      },
      'dexterity': {
        name: 'Dexterity',
        description: 'The chance your physical attacks hit and critical hit.',
        type: 'main',
        value: st['dexterity'],
        modifier: 0,
        battle: 0,
        get total(): number {
          return this.value + this.modifier + this.battle;
        }
      },
      'constitution': {
        name: 'Constitution',
        description: 'Determines your maximum health.',
        type: 'main',
        value: st['constitution'],
        modifier: 0,
        battle: 0,
        get total(): number {
          return this.value + this.modifier + this.battle;
        }
      },
      'intelligence': {
        name: 'Intelligence',
        description: 'How much damage your magical attacks do.',
        type: 'main',
        value: st['intelligence'],
        modifier: 0,
        battle: 0,
        get total(): number {
          return this.value + this.modifier + this.battle;
        }
      },
      'initiative': {
        name: 'Initiative',
        description: 'Determines who strikes first.',
        type: 'main',
        value: st['initiative'],
        modifier: 0,
        battle: 0,
        get total(): number {
          return this.value + this.modifier + this.battle;
        }
      },
      'armour': {
        name: 'Armour',
        description: 'Offers protection from physical attacks',
        type: 'defense',
        value: armour,
        modifier: 0,
        battle: 0,
        get total(): number {
          return this.value + this.modifier + this.battle;
        }
      },
      'magicResistance': {
        name: 'Magic Resistance',
        description: 'Offers protection from magical attacks',
        type: 'defense',
        value: magicResistance,
        modifier: 0,
        battle: 0,
        get total(): number {
          return this.value + this.modifier + this.battle;
        }
      }
    };

    // Health and alive variables
    this.maxHealth = (): number => this.stats['constitution'].value * 10;
    this.currentHealth = this.maxHealth();
    this.dead = (): boolean => this.currentHealth <= 0;

    // Hit and crit chance
    this.hitChance = (): number => (this.stats['dexterity'].value + this.stats['dexterity'].modifier) * 5;
    this.critChance = (): number => (this.stats['dexterity'].value + this.stats['dexterity'].modifier) * 0.75;
  }

  // Get specific stat types
  getStats = function(type): Object {
    const stats = {};
    for (let stat of Object.keys(this.stats)) {
      if (this.stats[stat].type === type) {
        stats[stat] = this.stats[stat];
      }
    }
    return stats;
  };

  // Use stats to check whether or not attack hits and crits
  checkHit = (): boolean => this.hitChance() >= this.dice.roll(1, 100) ? true : false;
  checkCrit = (): boolean => this.critChance() >= this.dice.roll(1, 100) ? true : false;

  // Mitigate damage based on stats
  checkResistance = (damage, stat): number => damage - stat < 0 ? 0 : damage - stat;

  // Get damage based on stats
  getDamage = (ability): number => Math.floor(
    this.stats[ability.modifier].total * ability.multiplier +
    this.dice.roll(ability.bonusMin + 1, ability.bonusMax + 6)
  )

  // Add or refresh ability effect
  addEffect(ability) {
    if (this.activeEffects.indexOf(ability) > -1) {
      this.stats[ability.modifier].battle += ability.value;
      this.activeEffects.push(ability);
    } else {
      this.activeEffects[this.activeEffects.indexOf(ability)]['remaining'] = ability.maxUses;
    }
  }

  // Update active effects
  updateEffects() {
    for (let i = this.activeEffects.length - 1; i >= 0; i--) {
      this.activeEffects[i]['remaining']--;
      if (this.activeEffects[i]['remaining'] < 1) {
        this.stats[this.activeEffects[i]['modifier']].battle -= this.activeEffects[i]['value'];
        this.activeEffects.splice(i, 1);
      }
    }
  }

  // Subtract from current health when hit
  takeHit(damage): void {
    this.currentHealth -= damage;
  }
}
