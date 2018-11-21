import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../shared/services/navigation.service';

@Component({
  selector: 'app-town',
  templateUrl: './town.component.html',
  styleUrls: ['./town.component.scss']
})
export class TownComponent implements OnInit {

  constructor(private nav: NavigationService) { }

  ngOnInit() {
  }

  proceed(selection) {
    switch (selection) {
      case 'arena':
        this.nav.uiCard.next({ face: 'front', view: 'arena', flip: true });
        this.nav.enemyCard.next({ flip: true });
        break;

      case 'store':
        this.nav.uiCard.next({ face: 'front', view: 'store', flip: true });
        this.nav.playerCard.next({ face: 'back', view: 'inventory', flip: true });
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
