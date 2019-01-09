export class Config {

  readonly healthMultiplier = 10; // Multiply by constitution to get health
  readonly hitMultiplier = 5; // Multiply by dexterity to get hit chance
  readonly critMultiplier = 0.75; // Multiply by dexterity to get crit chance

  readonly skillPoints = 0; // Skill points to start with
  readonly gold = 999999; // Gold the player starts with
  readonly rerolls = 10; // Number of rerolls allowed
  readonly maxAbilities = 6; // Number of abilities allowed

  // Experience required for each level
  readonly levelTier = {
    'level_2': 100,
    'level_3': 300,
    'level_4': 800,
    'level_5': 1500,
    'level_6': 3000,
    'level_7': 5000,
    'level_8': 8000,
    'level_9': 12000,
    'level_10': 20000
  };
}
