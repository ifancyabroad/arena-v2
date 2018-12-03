import { GameEntity } from './game-entity';

export class Enemy extends GameEntity {

  type = 'enemy';

  constructor(
    public name: string,
    public portrait: string,
    public st: Object,
    public ab: Object[],
    public armour = 0,
    public magicResistance = 0,
    public expValue: number,
    public goldValue: number
  ) {
    super(name, portrait, st, ab, armour, magicResistance);
  }

  getAction(): Object {
    return this.abilities[this.dice.roll(0, this.abilities.length - 1)];
  }
}
