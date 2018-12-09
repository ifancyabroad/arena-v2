import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/shared/services/player.service';
import { Player } from 'src/app/shared/classes/player';
import { slideinout } from 'src/app/animations/slideinout';

@Component({
  selector: 'app-player-abilities',
  templateUrl: './player-abilities.component.html',
  styleUrls: ['./player-abilities.component.scss'],
  animations: [slideinout]
})
export class PlayerAbilitiesComponent implements OnInit {

  player: Player;

  constructor(private ps: PlayerService) { }

  ngOnInit() {
    this.player = this.ps.player;
  }

  removeAbility(ability) {
    this.player.forgetAbility(ability);
  }

}
