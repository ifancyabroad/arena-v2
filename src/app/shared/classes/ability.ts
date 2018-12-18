export class Ability {

  uses: number; // Remaining uses

  constructor(
    public name: string,
    public description: string,
    public plane: string,
    public effects: Array<Object>,
    public price: number,
    public maxUses: number,
    public level: number
  ) {
    this.refreshAbility(); // Get starting uses
  }

  // Refresh ability
  refreshAbility() {
    if (this.maxUses) {
      this.uses = this.maxUses;
    }
  }

  // Use ability
  useAbility() {
    if (this.uses) {
      this.uses--;
    }
  }
}
