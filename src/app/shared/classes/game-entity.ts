import { UtilitiesService } from '../services/utilities.service';

export class GameEntity {

  dice = new UtilitiesService; // Get dice

  stats; // Entity stats
  maxHealth; // Maximum health based on constitution
  currentHealth; // Current health of entity
  dead; // Is entity dead
  hitChance; // Hit chance based on dexterity
  critChance; // Critical hit chance based on dexterity

  constructor(
    public name: string,
    public portrait: string,
    public st: Object,
    public armour = 0,
    public magicResistance = 0
  ) {
    this.stats = {
      'strength': {
        name: 'Strength',
        description: 'How much damage your physical attacks do.',
        value: st['strength'],
        modifier: 0,
        get total() {
          return this.value + this.modifier;
        }
      },
      'dexterity': {
        name: 'Dexterity',
        description: 'The chance your physical attacks hit and critical hit.',
        value: st['dexterity'],
        modifier: 0,
        get total() {
          return this.value + this.modifier;
        }
      },
      'constitution': {
        name: 'Constitution',
        description: 'Determines your maximum health.',
        value: st['constitution'],
        modifier: 0,
        get total() {
          return this.value + this.modifier;
        }
      },
      'intelligence': {
        name: 'Intelligence',
        description: 'How much damage your magical attacks do.',
        value: st['intelligence'],
        modifier: 0,
        get total() {
          return this.value + this.modifier;
        }
      },
      'initiative': {
        name: 'Initiative',
        description: 'Determines who strikes first.',
        value: st['initiative'],
        modifier: 0,
        get total() {
          return this.value + this.modifier;
        }
      }
    };

    this.maxHealth = function() {
      return this.stats.constitution.value * 10;
    };

    this.currentHealth = this.maxHealth();

    this.dead = function() {
      return this.currentHealth <= 0;
    };

    this.hitChance = function() {
      return (this.stats.dexterity.value + this.stats.dexterity.modifier) * 5;
    }

    this.critChance = function() {
      return (this.stats.dexterity.value + this.stats.dexterity.modifier) * 0.75;
    };
  }

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
  getDamage(stat) {
    return stat.total + this.dice.roll(1, 6);
  }

  // Subtract from current health when hit
  takeHit(damage) {
    this.currentHealth -= damage;
  }
}
