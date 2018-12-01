import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { PlayerService } from 'src/app/shared/services/player.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-level-up',
  templateUrl: './level-up.component.html',
  styleUrls: ['./level-up.component.scss']
})
export class LevelUpComponent implements OnInit, OnDestroy {

  keys = Object.keys;
  player;

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

  initiateTempValues() {
    this.tempPoints = this.player.skillPoints;
    this.tempStats = {};
    for (let stat of this.keys(this.player.stats)) {
      this.tempStats[stat] = {};
      this.tempStats[stat]['name'] = this.player.stats[stat]['name'];
      this.tempStats[stat]['value'] = this.player.stats[stat]['value'];
      this.tempStats[stat]['min'] = this.player.stats[stat]['value'];
    }
  }

  changeStat(stat, modifier) {
    if (stat.value + modifier >= stat.min && this.tempPoints - modifier >= 0) {
      stat.value += modifier;
      this.tempPoints -= modifier;
    }
  }

  levelUp() {
    this.player.skillPoints = this.tempPoints;
    for (let stat of this.keys(this.player.stats)) {
      this.player.stats[stat]['value'] = this.tempStats[stat]['value'];
    }
    this.nav.uiCard.next({ face: 'back', view: 'town', flip: true });
  }

  back() {
    this.nav.uiCard.next({ face: 'back', view: 'town', flip: true });
  }

  ngOnDestroy() {
    this.navSubscription.unsubscribe();
  }

}
