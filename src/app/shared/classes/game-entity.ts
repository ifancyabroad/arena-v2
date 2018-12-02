import { UtilitiesService } from '../services/utilities.service';

export class GameEntity {

  dice = new UtilitiesService; // Get dice

  stats; // Entity main stats
  abilities; // Entity abilities
  maxHealth; // Maximum health based on constitution
  currentHealth; // Current health of entity
  dead; // Is entity dead
  hitChance; // Hit chance based on dexterity
  critChance; // Critical hit chance based on dexterity

  constructor(
    public name: string,
    public portrait: string,
    public st: Object,
    public ab: Object[],
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
        get total() {
          return this.value + this.modifier;
        }
      },
      'dexterity': {
        name: 'Dexterity',
        description: 'The chance your physical attacks hit and critical hit.',
        type: 'main',
        value: st['dexterity'],
        modifier: 0,
        get total() {
          return this.value + this.modifier;
        }
      },
      'constitution': {
        name: 'Constitution',
        description: 'Determines your maximum health.',
        type: 'main',
        value: st['constitution'],
        modifier: 0,
        get total() {
          return this.value + this.modifier;
        }
      },
      'intelligence': {
        name: 'Intelligence',
        description: 'How much damage your magical attacks do.',
        type: 'main',
        value: st['intelligence'],
        modifier: 0,
        get total() {
          return this.value + this.modifier;
        }
      },
      'initiative': {
        name: 'Initiative',
        description: 'Determines who strikes first.',
        type: 'main',
        value: st['initiative'],
        modifier: 0,
        get total() {
          return this.value + this.modifier;
        }
      },
      'armour': {
        name: 'Armour',
        description: 'Offers protection from physical attacks',
        type: 'defense',
        value: armour,
        modifier: 0,
        get total() {
          return this.value + this.modifier;
        }
      },
      'magicResistance': {
        name: 'Magic Resistance',
        description: 'Offers protection from magical attacks',
        type: 'defense',
        value: magicResistance,
        modifier: 0,
        get total() {
          return this.value + this.modifier;
        }
      }
    };

    this.abilities = ab.map(ability => {
      if (ability['maxUses']) {
        ability['uses'] = ability['maxUses'];
      }
      return ability;
    });

    this.maxHealth = function() {
      return this.stats.constitution.value * 10;
    };

    this.currentHealth = this.maxHealth();

    this.dead = function() {
      return this.currentHealth <= 0;
    };

    this.hitChance = function() {
      return (this.stats.dexterity.value + this.stats.dexterity.modifier) * 5;
    };

    this.critChance = function() {
      return (this.stats.dexterity.value + this.stats.dexterity.modifier) * 0.75;
    };
  }

  // Get specific stat types
  getStats = function(type) {
    const stats = {};
    for (let stat of Object.keys(this.stats)) {
      if (this.stats[stat].type === type) {
        stats[stat] = this.stats[stat];
      }
    }
    return stats;
  };

  // Use stats to check whether or not attack hits and crits
  checkHit() {
    return this.hitChance() >= this.dice.roll(1, 100) ? true : false;
  }

  checkCrit() {
    return this.critChance() >= this.dice.roll(1, 100) ? true : false;
  }

  // Mitigate damage based on stats
  checkResistance(damage, stat) {
    return damage - stat < 0 ? 0 : damage - stat;
  }

  // Get damage based on stats
  getDamage(ability) {
    return Math.floor(this.stats[ability.modifier].total * ability.multiplier + this.dice.roll(ability.bonusMin + 1, ability.bonusMax + 6));
  }

  // Subtract from current health when hit
  takeHit(damage) {
    this.currentHealth -= damage;
  }
}
