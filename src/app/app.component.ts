import { Component, OnInit } from '@angular/core';
import { BattleService } from './shared/services/battle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'arena-v2';
  gameOver = false;

  constructor(private bs: BattleService) { }

  ngOnInit() {
    this.bs.state.subscribe(state => {
      if (state === 'defeat') {
        this.gameOver = true;
      }
    });
  }
}
