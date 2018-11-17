import { GameEntity } from './game-entity';

export class Enemy extends GameEntity {

  constructor(
    public name,
    public portrait,
    public st,
    public armour = 0,
    public magicResistance = 0,
    public expValue,
    public goldValue
  ) {
    super(name, portrait, st, armour, magicResistance);
  }
}
