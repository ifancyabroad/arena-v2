import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Player } from '../shared/classes/player';
import { Enemy } from '../shared/classes/enemy';
import { PlayerService } from '../shared/services/player.service';
import { EnemyService } from '../shared/services/enemy.service';
import { slideinout } from 'src/app/animations/slideinout';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss'],
  animations: [slideinout]
})
export class GameOverComponent implements OnInit {

  player: Player; // Player object
  enemy: Enemy; // Enemy object

  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(private ps: PlayerService, private es: EnemyService) { }

  ngOnInit() {
    this.player = this.ps.player;
    this.enemy = this.es.enemy;
  }

  // Restart the game
  reset() {
    this.close.emit();
  }

}
