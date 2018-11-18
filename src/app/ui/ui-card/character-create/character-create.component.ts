import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../shared/services/navigation.service';
import { Player } from '../../../shared/classes/player';

@Component({
  selector: 'app-character-create',
  templateUrl: './character-create.component.html',
  styleUrls: ['./character-create.component.scss']
})
export class CharacterCreateComponent implements OnInit {

  navSubscription;

  constructor(private nav: NavigationService) { }

  ngOnInit() {
  }

  createPlayer() {
    this.nav.uiCard.next({face: 'front', view: 'roll-stats', flip: false});
  }
}
