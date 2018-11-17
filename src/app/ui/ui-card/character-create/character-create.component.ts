import { Component, OnInit } from '@angular/core';
import { GameEntity } from '../../../shared/classes/game-entity';
import { Enemy } from '../../../shared/classes/enemy';
import { Player } from '../../../shared/classes/player';

@Component({
  selector: 'app-character-create',
  templateUrl: './character-create.component.html',
  styleUrls: ['./character-create.component.scss']
})
export class CharacterCreateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
