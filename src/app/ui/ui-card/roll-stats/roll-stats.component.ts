import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../shared/services/navigation.service';
import { PlayerService } from '../../../shared/services/player.service';
import { UtilitiesService } from '../../../shared/services/utilities.service';
import { Player } from 'src/app/shared/classes/player';

@Component({
  selector: 'app-roll-stats',
  templateUrl: './roll-stats.component.html',
  styleUrls: ['./roll-stats.component.scss']
})
export class RollStatsComponent implements OnInit {

  keys = Object.keys;
  player: Player;

  constructor(
    private nav: NavigationService,
    private ps: PlayerService,
    private dice: UtilitiesService
  ) {
    this.player = this.ps.player;
  }

  ngOnInit() {
  }

  // Re-roll stats
  rollStats() {
    if (this.player.rerolls) {
      this.player.rerolls--;
      const minStats = this.player.cl['minStats'];
      const maxStats = this.player.cl['maxStats'];
      for (let stat of Object.keys(maxStats)) {
        this.player.stats[stat].value = this.dice.roll(minStats[stat], maxStats[stat]);
      }
      this.player.setFullHealth();
    }
  }

  // Proceed to town
  proceed() {
    this.nav.uiCard.next({ face: 'back', view: 'town', flip: true });
    this.nav.playerCard.next({ flip: true });
  }

}
