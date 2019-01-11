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

  // Kills needed for each rank
  readonly rankTier = [
    { 'rank': 1, 'kills': 60, 'name': 'God', 'img': '' },
    { 'rank': 2, 'kills': 50, 'name': 'Demi-God', 'img': '' },
    { 'rank': 3, 'kills': 45, 'name': 'Mythical', 'img': '' },
    { 'rank': 4, 'kills': 40, 'name': 'Legend', 'img': '' },
    { 'rank': 5, 'kills': 36, 'name': 'Conqueror', 'img': '' },
    { 'rank': 6, 'kills': 32, 'name': 'Warlord', 'img': '' },
    { 'rank': 7, 'kills': 28, 'name': 'Grand Champion', 'img': '' },
    { 'rank': 8, 'kills': 24, 'name': 'Champion', 'img': '' },
    { 'rank': 9, 'kills': 21, 'name': 'Hero', 'img': '' },
    { 'rank': 10, 'kills': 18, 'name': 'Vanquisher', 'img': '' },
    { 'rank': 11, 'kills': 15, 'name': 'Gladiator', 'img': '' },
    { 'rank': 12, 'kills': 12, 'name': 'Challenger', 'img': '' },
    { 'rank': 13, 'kills': 10, 'name': 'Fighter', 'img': '' },
    { 'rank': 14, 'kills': 8, 'name': 'Brawler', 'img': '' },
    { 'rank': 15, 'kills': 6, 'name': 'Mercenary', 'img': '' },
    { 'rank': 16, 'kills': 4, 'name': 'Wanderer', 'img': '' },
    { 'rank': 17, 'kills': 3, 'name': 'Fledgling', 'img': '' },
    { 'rank': 18, 'kills': 2, 'name': 'Recruit', 'img': '' },
    { 'rank': 19, 'kills': 1, 'name': 'Maggot', 'img': '' },
    { 'rank': 20, 'kills': 0, 'name': 'Goblin Fodder', 'img': '' }
  ];
}
