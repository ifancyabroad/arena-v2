import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerService } from 'src/app/shared/services/player.service';
import { Player } from 'src/app/shared/classes/player';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-healer',
  templateUrl: './healer.component.html',
  styleUrls: ['./healer.component.scss']
})
export class HealerComponent implements OnInit, OnDestroy {

  player: Player;
  healerLog = 'Hello and welcome to the healer!';

  services = [
    { name: 'Cure Minor Wounds', value: 30, price: 80 },
    { name: 'Cure Major Wounds', value: 60, price: 120 },
    { name: 'Cure Critical Wounds', value: 90, price: 160 },
    { name: 'Rest', value: 15, price: 60 },
  ];

  navSubscription: Subscription;

  constructor(private nav: NavigationService, private ps: PlayerService) { }

  ngOnInit() {
    this.player = this.ps.player;

    this.navSubscription = this.nav.uiCard.subscribe(nav => {
      if (nav['view'] === 'healer') {
        this.resetLog();
      }
    });
  }

  // Heal specified amount or rest
  buyService(name, price, health?) {
    if (this.player.gold < price) {
      this.healerLog = 'You do not have enough gold for that';
    } else {
      this.player.gold -= price;
      this.player.heal(health);
      if (name === 'Rest') {
        this.player.rest();
      }
    }
  }

  // Reset healer log to initial message
  resetLog() {
    this.healerLog = 'Hello and welcome to the healer!';
  }

  // Go back to town
  back() {
    this.nav.uiCard.next({ face: 'back', view: 'town', flip: true });
  }

  ngOnDestroy() {
    this.navSubscription.unsubscribe();
  }

}
