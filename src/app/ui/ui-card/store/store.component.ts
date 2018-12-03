import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemService } from './item.service';
import { PlayerService } from 'src/app/shared/services/player.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/shared/classes/player';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit, OnDestroy {

  items: Object[];
  player: Player;
  storeLog = 'Hello and welcome to the store!';

  navSubscription: Subscription;

  constructor(
    private nav: NavigationService,
    private is: ItemService,
    private ps: PlayerService
  ) { }

  ngOnInit() {
    this.player = this.ps.player;
    this.is.getItems().subscribe(items => this.items = items);

    this.navSubscription = this.nav.uiCard.subscribe(nav => {
      if (nav['view'] === 'store') {
        this.resetLog();
      }
    });
  }

  // Purchase selected item
  buyItem(item) {
    if (this.player.gold >= item.price) {
      this.player.gold -= item.price;
      this.player.updateInventory(item);
    } else {
      this.storeLog = 'You do not have enough gold for that';
    }
  }

  // Reset store log to initial message
  resetLog() {
    this.storeLog = 'Hello and welcome to the store!';
  }

  // Go back to town
  back() {
    this.nav.uiCard.next({ face: 'back', view: 'town', flip: true });
    this.nav.playerCard.next({ flip: true });
  }

  ngOnDestroy() {
    this.navSubscription.unsubscribe();
  }

}
