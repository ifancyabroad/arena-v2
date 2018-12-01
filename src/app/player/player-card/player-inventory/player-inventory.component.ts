import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-player-inventory',
  templateUrl: './player-inventory.component.html',
  styleUrls: ['./player-inventory.component.scss']
})
export class PlayerInventoryComponent implements OnInit {

  keys = Object.keys;
  player;

  constructor(private ps: PlayerService) { }

  ngOnInit() {
    this.player = this.ps.player;
  }

}
