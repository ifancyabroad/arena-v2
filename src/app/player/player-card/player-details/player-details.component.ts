import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss']
})
export class PlayerDetailsComponent implements OnInit {

  player;

  constructor(private ps: PlayerService) {
  }

  ngOnInit() {
    this.ps.characterCreated.subscribe(created => {
      if (created) {
        this.player = this.ps.player;
      }
    });
  }

}
