import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../shared/services/player.service';

@Component({
  selector: 'app-roll-stats',
  templateUrl: './roll-stats.component.html',
  styleUrls: ['./roll-stats.component.scss']
})
export class RollStatsComponent implements OnInit {

  constructor(private ps: PlayerService) { }

  ngOnInit() {
    console.log(this.ps.player);
  }

}
