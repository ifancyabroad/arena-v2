import { GameEntity } from './game-entity';

export class Enemy extends GameEntity {

  type = 'enemy';

  constructor(
    public name: string,
    public portrait: string,
    public st: Object,
    public abilities: Object[],
    public armour = 0,
    public magicResistance = 0,
    public expValue: number,
    public goldValue: number
  ) {
    super(name, portrait, st, abilities, armour, magicResistance);
  }

  // AI to get the enemies choice of action
  getAction(player): Object {
    let options = this.abilities.filter(ability => !ability['maxUses'] || ability['uses'] > 0); // Filter out abilities with 0 uses

    options = this.getLowPriority(options, player);
    options = this.getMidPriority(options).length ? this.getMidPriority(options) : options;
    options = this.getHighPriority(options).length ? this.getHighPriority(options) : options;

    return options[this.dice.roll(0, options.length - 1)];
  }

  // Lowest priority (remove unimportant options)
  getLowPriority(options, player) {
    return options.filter(option => {
      let reject;
      option['effects'].forEach(effect => {
        // Filter out active debuffs
        if (player.effectActive(effect) && effect.type === 'debuff') {
          reject = true;
        }
        // Filter out active buffs
        if (this.effectActive(effect) && effect.type === 'buff') {
          reject = true;
        }
        // Filter out heals if health too high
        if ((this.currentHealth / this.maxHealth()) * 100 > 80 && effect.type === 'heal') {
          reject = true;
        }
      });
      return !reject;
    });
  }

  // Mid priority
  getMidPriority(options) {
    return options.filter(option => {
      let priority;
      option['effects'].forEach(effect => {
        if (option.name !== 'Attack' && effect.type === 'damage') {
          priority = true;
        }
      });
      return priority;
    });
  }

  // Highest priority
  getHighPriority(options) {
    return options.filter(option => {
      let priority;
      option['effects'].forEach(effect => {
        // Filter out everything but heals if health too low
        if ((this.currentHealth / this.maxHealth()) * 100 < 40 && effect.type === 'heal') {
          priority = true;
        }
      });
      return priority;
    });
  }
}
