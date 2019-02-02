import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Player } from '../shared/classes/player';
import { Enemy } from '../shared/classes/enemy';
import { PlayerService } from '../shared/services/player.service';
import { EnemyService } from '../shared/services/enemy.service';
import { slideinout } from 'src/app/animations/slideinout';
import { Config } from '../shared/config';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss'],
  animations: [slideinout]
})
export class GameOverComponent implements OnInit {

  player: Player; // Player object
  enemy: Enemy; // Enemy object

  rankingTier: Array<Object>; // Ranking tier
  rank: any; // Players final rank

  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(
    private config: Config,
    private ps: PlayerService,
    private es: EnemyService
  ) { }

  ngOnInit() {
    this.player = this.ps.player;
    this.enemy = this.es.enemy;
    this.rankingTier = this.config.rankTier;
    this.rank = this.getRank();
  }

  // Calculate the players final rank
  getRank = () => this.rankingTier.filter(rank => this.player.kills >= rank['kills']).shift();

  // Restart the game
  closeModal() {
    this.close.emit();
  }

}
