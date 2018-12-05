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
    this.maxHealth = (): number => this.stats['constitution'].total * 10;
    this.currentHealth = this.maxHealth();
    this.dead = (): boolean => this.currentHealth <= 0;

    // Hit and crit chance
    this.hitChance = (): number => this.stats['dexterity'].total * 5;
    this.critChance = (): number => this.stats['dexterity'].total * 0.75;
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

  // Subtract from current health when hit
  takeHit(damage): void {
    this.currentHealth -= damage;
  }

  // Get damage based on stats
  getDamage = (effect): number => Math.floor(
    this.stats[effect.modifier].total * effect.multiplier +
    this.dice.roll(effect.min, effect.max)
  )

  effectActive(effect) {
    return this.activeEffects.indexOf(effect) > -1;
  }

  addEffect(name, effect) {
    for (let modifier of Object.keys(effect.modifiers)) {
      this.stats[modifier].battle += effect.modifiers[modifier];
    }
    effect.name = name;
    effect.remaining = effect.duration;
    this.activeEffects.push(effect);
  }

  refreshEffect(effect) {
    this.activeEffects[this.activeEffects.indexOf(effect)]['remaining'] = effect.duration;
  }

  // Update active effects
  updateEffects() {
    for (let i = this.activeEffects.length - 1; i >= 0; i--) {
      this.activeEffects[i]['remaining']--;
      if (this.activeEffects[i]['remaining'] < 0) {
        for (let modifier of Object.keys(this.activeEffects[i]['modifiers'])) {
          this.stats[modifier].battle -= this.activeEffects[i]['modifiers'][modifier];
        }
        this.activeEffects.splice(i, 1);
      }
    }
  }
}
