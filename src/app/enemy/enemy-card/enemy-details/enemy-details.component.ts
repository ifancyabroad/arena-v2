import { Component, OnInit } from '@angular/core';
import { EnemyService } from 'src/app/shared/services/enemy.service';
import { Enemy } from 'src/app/shared/classes/enemy';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { PlayerService } from 'src/app/shared/services/player.service';
import { AbilitiesService } from 'src/app/shared/services/abilities.service';
import { Player } from 'src/app/shared/classes/player';

@Component({
  selector: 'app-enemy-details',
  templateUrl: './enemy-details.component.html',
  styleUrls: ['./enemy-details.component.scss']
})
export class EnemyDetailsComponent implements OnInit {

  player: Player;
  enemy: Enemy;
  enemiesList: Object[];
  abilityList: Object[];

  constructor(
    private es: EnemyService,
    private ps: PlayerService,
    private as: AbilitiesService,
    private dice: UtilitiesService
  ) { }

  ngOnInit() {
    this.es.getEnemies().subscribe(enemies => this.enemiesList = enemies);
    this.as.getAbilities().subscribe(abilities => this.abilityList = abilities);

    this.es.enemyCreated.subscribe(created => {
      if (created) {
        this.createEnemy();
        this.enemy = this.es.enemy;
      }
    });

    this.ps.characterCreated.subscribe(created => {
      if (created) {
        this.player = this.ps.player;
      }
    });
  }

  // Get enemy abilities
  getEnemyAbilities(enemy) {
    let allAbilities = [];
    for (let type of Object.keys(this.abilityList)) {
      allAbilities = allAbilities.concat(this.abilityList[type]);
    }
    return allAbilities.filter(ability => enemy.abilities.indexOf(ability.name) !== -1);
  }

  // Create enemy
  createEnemy() {
    const enemyTier = this.enemiesList.filter(e => this.player.kills >= e['challenge']);
    const enemy = enemyTier[this.dice.roll(0, enemyTier.length - 1)];

    this.es.enemy = new Enemy(
      enemy['name'],
      enemy['portrait'],
      enemy['stats'],
      this.getEnemyAbilities(enemy),
      enemy['armour'],
      enemy['magicResistance'],
      enemy['expValue'],
      enemy['goldValue']
    );
  }

}
