import { Component, OnInit, OnDestroy } from '@angular/core';
import { Player } from 'src/app/shared/classes/player';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { AbilitiesService } from 'src/app/shared/services/abilities.service';
import { PlayerService } from 'src/app/shared/services/player.service';
import { Ability } from 'src/app/shared/classes/ability';

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
    this.as.getAbilities().subscribe(abilities => {
      this.abilities = abilities[this.player.cl['name'].toLowerCase()].filter(ability => ability.level > 0);
      this.sortAbilities('level');
    });

    this.navSubscription = this.nav.uiCard.subscribe(nav => {
      if (nav['view'] === 'trainer') {
        this.resetLog();
      }
    });
  }

  // Sort abilities by clicked parameter
  sortAbilities(parameter) {
    this.abilities.sort((a, b) => {
      if (a[parameter] > b[parameter]) {
        return 1;
      } else if (a[parameter] < b[parameter]) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  // Check if player already has ability
  checkAbility = (ability) => this.player.abilities.filter(a => a.name === ability.name).length > 0;

  // Purchase selected ability
  learnAbility(ability) {
    if (this.player.gold < ability.price) {
      this.trainerLog = 'You do not have enough gold for that';
    } else if (this.player.abilities.length >= this.player.maxAbilities) {
      this.trainerLog = 'I\'m afraid you do not have the capacity to learn anymore abilities';
    } else if (this.player.level < ability.level) {
      this.trainerLog = 'Sorry you do not have the required skill for that';
    } else {
      this.player.gold -= ability.price;
      this.player.learnAbility(
        new Ability(
          ability.name,
          ability.description,
          ability.plane,
          ability.effects,
          ability.price,
          ability.maxUses,
          ability.level
        )
      );
    }
  }

  // Reset store log to initial message
  resetLog() {
    this.trainerLog = 'Hello and welcome to the store!';
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
