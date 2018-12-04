import { Component, OnInit, OnDestroy } from '@angular/core';
import { Player } from 'src/app/shared/classes/player';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { AbilitiesService } from 'src/app/shared/services/abilities.service';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.scss']
})
export class TrainerComponent implements OnInit, OnDestroy {

  abilities: Object[];
  player: Player;
  trainerLog = 'Hello and welcome to the trainer!';

  navSubscription: Subscription;

  constructor(
    private nav: NavigationService,
    private as: AbilitiesService,
    private ps: PlayerService
  ) { }

  ngOnInit() {
    this.player = this.ps.player;
    this.as.getAbilities().subscribe(abilities => this.abilities = abilities[this.player.cl['name'].toLowerCase()]);

    this.navSubscription = this.nav.uiCard.subscribe(nav => {
      if (nav['view'] === 'trainer') {
        this.resetLog();
      }
    });
  }

  // Purchase selected ability
  learnAbility(ability) {
    if (this.player.gold >= ability.price) {
      this.player.gold -= ability.price;
      this.player.learnAbility(ability);
    } else {
      this.trainerLog = 'You do not have enough gold for that';
    }
  }

  // Reset store log to initial message
  resetLog() {
    this.trainerLog = 'Hello and welcome to the store!';
  }

  // Go back to town
  back() {
    this.nav.uiCard.next({ face: 'back', view: 'town', flip: true });
  }

  ngOnDestroy() {
    this.navSubscription.unsubscribe();
  }

}
