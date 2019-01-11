import { Component, OnInit } from '@angular/core';
import { BattleService } from './shared/services/battle.service';
import { NavigationService } from './shared/services/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'arena-v2';
  gameOver = false;

  constructor(private bs: BattleService, private nav: NavigationService) { }

  ngOnInit() {
    this.bs.state.subscribe(state => {
      if (state === 'defeat') {
        this.gameOver = true;
      }
    });
  }

  // Reset the cards
  reset() {
    this.gameOver = false;
    this.nav.uiCard.next({ face: 'back', view: 'hidden', flip: true });
    this.nav.playerCard.next({ face: 'back', view: 'hidden', flip: true });
    this.nav.enemyCard.next({ flip: true });
  }
}
