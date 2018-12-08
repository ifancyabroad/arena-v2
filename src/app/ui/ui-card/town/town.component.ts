import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../shared/services/navigation.service';
import { EnemyService } from 'src/app/shared/services/enemy.service';
import { BattleService } from 'src/app/shared/services/battle.service';
import { PlayerService } from 'src/app/shared/services/player.service';
import { Player } from 'src/app/shared/classes/player';

@Component({
  selector: 'app-town',
  templateUrl: './town.component.html',
  styleUrls: ['./town.component.scss']
})
export class TownComponent implements OnInit {

  player: Player;

  constructor(
    private nav: NavigationService,
    private ps: PlayerService,
    private es: EnemyService,
    private bs: BattleService
  ) {
    this.player = this.ps.player;
  }

  ngOnInit() {
  }

  // Navigate based on user input
  proceed(selection) {
    switch (selection) {
      case 'arena':
        this.es.enemyCreated.next(true);
        this.bs.state.next('start');
        this.nav.uiCard.next({ face: 'front', view: 'arena', flip: true });
        this.nav.enemyCard.next({ flip: true });
        break;

      case 'store':
        this.nav.uiCard.next({ face: 'front', view: 'store', flip: true });
        this.nav.playerCard.next({ face: 'back', view: 'inventory', flip: true });
        break;

      case 'trainer':
        this.nav.uiCard.next({ face: 'front', view: 'trainer', flip: true });
        break;

      case 'healer':
        this.nav.uiCard.next({ face: 'front', view: 'healer', flip: true });
        break;

      case 'level-up':
        this.nav.uiCard.next({ face: 'front', view: 'level-up', flip: true });
        break;
    }
  }

}
