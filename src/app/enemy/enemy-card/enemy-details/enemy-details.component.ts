import { Component, OnInit } from '@angular/core';
import { EnemyService } from 'src/app/shared/services/enemy.service';
import { Enemy } from 'src/app/shared/classes/enemy';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-enemy-details',
  templateUrl: './enemy-details.component.html',
  styleUrls: ['./enemy-details.component.scss']
})
export class EnemyDetailsComponent implements OnInit {

  player;
  enemy;
  enemiesList;

  constructor(
    private es: EnemyService,
    private ps: PlayerService,
    private dice: UtilitiesService
  ) { }

  ngOnInit() {
    this.es.getEnemies().subscribe(enemies => this.enemiesList = enemies);

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
    })
  }

  createEnemy() {
    const enemyTier = this.enemiesList.filter(e => this.player.kills >= e.challenge);
    const enemy = enemyTier[this.dice.roll(0, enemyTier.length - 1)];

    this.es.enemy = new Enemy(
      enemy.name,
      enemy.portrait,
      enemy.stats,
      enemy.armour,
      enemy.magicResistance,
      enemy.expValue,
      enemy.goldValue
    );
  }

}
