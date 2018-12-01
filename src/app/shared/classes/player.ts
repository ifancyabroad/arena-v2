import { GameEntity } from './game-entity';

export class Player extends GameEntity {

  type = 'player';
  experience = 0; // Experience starts at 0
  gold = 0; // Gold starts at 0
  level = 1; // Start at level 1
  kills = 0; // Kills starts at 0;
  rerolls = 10; // 10 initial rerolls allowed
  skillPoints = 0; // Skill points available for spending

  inventory = {
    head: { name: 'None' },
    body: { name: 'None' },
    gloves: { name: 'None' },
    boots: { name: 'None' },
    weapon: { name: 'None' },
    misc: { name: 'None' }
  };

  // Find what level the player has earned through exp
  levelTier = function () {
    if (this.experience > 20000) {
      return 10;
    } else if (this.experience > 12000) {
      return 9;
    } else if (this.experience > 8000) {
      return 8;
    } else if (this.experience > 5000) {
      return 7;
    } else if (this.experience > 3000) {
      return 6;
    } else if (this.experience > 1500) {
      return 5;
    } else if (this.experience > 800) {
      return 4;
    } else if (this.experience > 300) {
      return 3;
    } else if (this.experience > 100) {
      return 2;
    } else {
      return 1;
    }
  };

  constructor(
    public name: string,
    public portrait: string,
    public cl: Object,
    public st: Object
  ) {
    super(name, portrait, st);
  }

  // Gain exp and check if skill point is earned
  experienceGain(xp) {
    const currentTier = this.levelTier();
    this.experience += xp;
    if (currentTier !== this.levelTier()) {
      this.skillPoints += 1;
    }
  }

  // Update stats from level up
  // updateStats(newStats) {
  //   for (let i = 0; i < this.stats.length; i++) {
  //     this.stats()[i].value(newStats[i].value());
  //   }
  // }

}
