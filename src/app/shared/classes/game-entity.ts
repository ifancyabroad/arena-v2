import { UtilitiesService } from '../services/utilities.service';

export class GameEntity {

  dice = new UtilitiesService; // Get dice

  stats;
  maxHealth; // Maximum health based on constitution
  currentHealth; // Current health of entity
  dead; // Is entity dead
  critChance; // Critical hit chance based on dexterity

  constructor(
    public name,
    public portrait,
    public st,
    public armour = 0,
    public magicResistance = 0
  ) {
    this.stats = {
      'strength': {
        name: 'Strength',
        value: st.strength,
        modifier: 0,
        description: 'How much damage your physical attacks do.'
      },
      'dexterity': {
        name: 'Dexterity',
        value: st.dexterity,
        modifier: 0,
        description: 'The chance your physical attacks hit and critical hit.'
      },
      'constitution': {
        name: 'Constitution',
        value: st.constitution,
        modifier: 0,
        description: 'Determines your maximum health.'
      },
      'intelligence': {
        name: 'Intelligence',
        value: st.intelligence,
        modifier: 0,
        description: 'How much damage your magical attacks do.'
      },
      'initiative': {
        name: 'Initiative',
        value: st.initiative,
        modifier: 0,
        description: 'Determines who strikes first.'
      }
    };

    this.maxHealth = function () {
      return this.stats.constitution.value * 10;
    };

    this.currentHealth = this.maxHealth();

    this.dead = function () {
      return this.currentHealth <= 0;
    };

    this.critChance = function () {
      return (this.stats.dexterity.value + this.stats.dexterity.modifier) * 0.75;
    };
  }

  // Use stats to check whether or not attack hits and crits
  checkHit() {
    const dex = this.stats.dexterity.value + this.stats.dexterity.modifier;
    return dex >= this.dice.roll(1, 20) ? true : false;
  }

  checkCrit() {
    return this.critChance() >= this.dice.roll(1, 100) ? true : false;
  }

  // Mitigate damage based on stats
  checkArmour(damage) {
    return damage - this.armour < 0 ? 0 : damage - this.armour;
  }

  checkMagicResistance(damage) {
    return damage - this.magicResistance < 0 ? 0 : damage - this.magicResistance;
  }

  // Get damage based on stats
  getPhysicalDamage() {
    const str = this.stats.strength.value + this.stats.strength.modifier;
    return str + this.dice.roll(1, 6);
  }

  getMagicalDamage() {
    const intel = this.stats.intelligence.value + this.stats.intelligence.modifier;
    return intel + this.dice.roll(1, 6);
  }

  // Subtract from current health when hit
  takeHit(damage) {
    this.currentHealth -= damage;
  }
}
