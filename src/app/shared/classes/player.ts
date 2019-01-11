import { GameEntity } from './game-entity';
import { Ability } from './ability';

export class Player extends GameEntity {

  type = 'player';
  level = 1; // Start at level 1
  kills = 0; // Kills starts at 0;
  experience = 0; // Experience starts at 0
  levelingTier: Array<Object>;
  skillPoints: number; // Skill points available for spending
  gold: number; // Gold starts at 0
  rerolls: number; // 10 initial rerolls allowed
  maxAbilities: number; // Maximum abilities that can be learnt

  // Inventory starts empty
  inventory = {
    head: { name: 'None' },
    body: { name: 'None' },
    gloves: { name: 'None' },
    boots: { name: 'None' },
    weapon: { name: 'None' },
    misc: { name: 'None' }
  };

  constructor(
    public name: string,
    public portrait: string,
    public cl: Object,
    public st: Object,
    public abilities: Array<Ability>
  ) {
    super(name, portrait, st, abilities);

    this.levelingTier = this.config.levelTier;
    this.skillPoints = this.config.skillPoints;
    this.gold = this.config.gold;
    this.rerolls = this.config.rerolls;
    this.maxAbilities = this.config.maxAbilities;
  }

  // Find what level the player has earned through exp
  levelTier = (): number => this.levelingTier.filter(level => this.experience >= level['exp']).pop()['level'];

  // Gain exp and check if skill point is earned
  experienceGain(xp): void {
    const currentTier = this.levelTier();
    this.experience += xp;
    if (currentTier !== this.levelTier()) {
      this.skillPoints += 1;
    }
  }

  // Update inventory with new item
  updateInventory(item): void {
    if (this.stats[this.inventory[item.type].modifier]) {
      this.stats[this.inventory[item.type].modifier].modifier -= this.inventory[item.type].value;
    }
    this.inventory[item.type] = item;
    this.stats[this.inventory[item.type].modifier].modifier += this.inventory[item.type].value;
  }

  // Learn a new ability
  learnAbility(ability): void {
    this.abilities.push(ability);
  }

  // Forget an ability
  forgetAbility(ability): void {
    this.abilities.splice(this.abilities.indexOf(ability), 1);
  }
}
