import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { PlayerService } from 'src/app/shared/services/player.service';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/shared/classes/player';

@Component({
  selector: 'app-level-up',
  templateUrl: './level-up.component.html',
  styleUrls: ['./level-up.component.scss']
})
export class LevelUpComponent implements OnInit, OnDestroy {

  keys = Object.keys;
  player: Player;

  tempStats: Object;
  tempPoints: number;

  navSubscription: Subscription;

  constructor(private nav: NavigationService, private ps: PlayerService) {
    this.player = this.ps.player;
  }

  ngOnInit() {
    this.initiateTempValues();

    if (!this.navSubscription) {
      this.navSubscription = this.nav.uiCard.subscribe(nav => {
        if (nav['view'] === 'level-up') {
          this.initiateTempValues();
        }
      });
    }
  }

  // Get temporary stat values
  initiateTempValues() {
    this.tempPoints = this.player.skillPoints;
    this.tempStats = {};
    for (let stat of this.keys(this.player.getStats('main'))) {
      this.tempStats[stat] = {};
      this.tempStats[stat]['name'] = this.player.stats[stat]['name'];
      this.tempStats[stat]['value'] = this.player.stats[stat]['value'];
      this.tempStats[stat]['min'] = this.player.stats[stat]['value'];
    }
  }

  // Adjust stat value
  changeStat(stat, modifier) {
    if (stat.value + modifier >= stat.min && this.tempPoints - modifier >= 0) {
      stat.value += modifier;
      this.tempPoints -= modifier;
    }
  }

  // Confirm level up
  levelUp() {
    this.player.level += this.player.skillPoints - this.tempPoints;
    this.player.skillPoints = this.tempPoints;
    for (let stat of this.keys(this.player.getStats('main'))) {
      this.player.stats[stat]['value'] = this.tempStats[stat]['value'];
    }
    this.nav.uiCard.next({ face: 'back', view: 'town', flip: true });
  }

  // Cancel changes, go back to town
  back() {
    this.nav.uiCard.next({ face: 'back', view: 'town', flip: true });
  }

  ngOnDestroy() {
    this.navSubscription.unsubscribe();
  }

}
