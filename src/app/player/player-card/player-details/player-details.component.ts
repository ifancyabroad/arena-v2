import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/shared/services/player.service';
import { Player } from 'src/app/shared/classes/player';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss']
})
export class PlayerDetailsComponent implements OnInit {

  keys = Object.keys;
  player: Player;

  stats = ['title', 'strength', 'dexterity', 'constitution', 'intelligence', 'initiative']; // Stats to scroll through on small screens
  currentStat = 'title'; // Current displayed stat for small screens
  statIndex = 0; // Index for navigating stats on small screens

  constructor(private ps: PlayerService) {
  }

  ngOnInit() {
    this.ps.characterCreated.subscribe(created => {
      if (created) {
        this.player = this.ps.player;
      }
    });
  }

  changeStat(direction) {
    this.statIndex = this.statIndex + direction > this.stats.length - 1 ?
      0 : this.statIndex + direction < 0 ?
        this.stats.length - 1 : this.statIndex + direction;
    this.currentStat = this.stats[this.statIndex];
  }
}
