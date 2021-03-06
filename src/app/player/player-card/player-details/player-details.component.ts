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

  currentStat = 'title'; // Current displayed stat for small screens
  stats: Array<string>; // Stats to scroll through on small screens
  statIndex = -1; // Index for navigating stats on small screens

  constructor(private ps: PlayerService) {
  }

  ngOnInit() {
    this.ps.characterCreated.subscribe(created => {
      if (created) {
        this.player = this.ps.player;
        this.stats = this.keys(this.player.getStats('main'));
      }
    });
  }

  // Cycle through player stats
  changeStat(direction) {
    this.statIndex = this.statIndex + direction > this.stats.length - 1 ?
      -1 : this.statIndex + direction < -1 ?
        this.stats.length - 1 : this.statIndex + direction;
    this.currentStat = this.statIndex === -1 ? 'title' : this.stats[this.statIndex];
  }
}
