import { Component, OnInit } from '@angular/core';
import { EnemyService } from 'src/app/shared/services/enemy.service';
import { Enemy } from 'src/app/shared/classes/enemy';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';

@Component({
  selector: 'app-enemy-details',
  templateUrl: './enemy-details.component.html',
  styleUrls: ['./enemy-details.component.scss']
})
export class EnemyDetailsComponent implements OnInit {

  enemy;
  enemiesList;

  constructor(private es: EnemyService, private dice: UtilitiesService) { }

  ngOnInit() {
    this.es.getEnemies().subscribe(enemies => this.enemiesList = enemies);

    this.es.enemyCreated.subscribe(created => {
      if (created) {
        this.createEnemy();
        this.enemy = this.es.enemy;
      }
    });
  }

  createEnemy() {
    const enemy = this.enemiesList[this.dice.roll(0, this.enemiesList.length)];

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
