import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../shared/services/navigation.service';
import { PlayerService } from '../../../shared/services/player.service';
import { UtilitiesService } from '../../../shared/services/utilities.service';

@Component({
  selector: 'app-roll-stats',
  templateUrl: './roll-stats.component.html',
  styleUrls: ['./roll-stats.component.scss']
})
export class RollStatsComponent implements OnInit {

  keys = Object.keys;
  player;

  constructor(
    private nav: NavigationService,
    private ps: PlayerService,
    private dice: UtilitiesService
  ) {
    this.player = this.ps.player;
  }

  ngOnInit() {
  }

  rollStats() {
    if (this.player.rerolls) {
      this.player.rerolls--;
      const maxStats = this.player.cl.maxStats;
      for (let stat of Object.keys(maxStats)) {
        this.player.stats[stat].value = this.dice.roll(maxStats[stat] - 5, maxStats[stat]);
      }
    }
  }

  proceed() {
    this.nav.uiCard.next({ face: 'back', view: 'town', flip: true });
    this.nav.playerCard.next({ flip: true });
  }

}
