import { GameEntity } from './game-entity';

export class Enemy extends GameEntity {

  type = 'enemy';

  constructor(
    public name: string,
    public portrait: string,
    public st: Object,
    public armour = 0,
    public magicResistance = 0,
    public expValue: number,
    public goldValue: number
  ) {
    super(name, portrait, st, armour, magicResistance);
  }

  getAction() {
    let action;
    const physical = this.getDamage(this.stats.strength);
    const magical = this.getDamage(this.stats.intelligence);
    return action = physical >= magical ? 'physical' : 'magical';
  }
}
