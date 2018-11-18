import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../shared/services/navigation.service';
import { PlayerService } from '../../../shared/services/player.service';
import { Player } from '../../../shared/classes/player';

@Component({
  selector: 'app-character-create',
  templateUrl: './character-create.component.html',
  styleUrls: ['./character-create.component.scss']
})
export class CharacterCreateComponent implements OnInit {

  nameInput: string;
  portraitInput: string = 'An image';
  classInput: string = 'A class';

  constructor(
    private nav: NavigationService,
    private ps: PlayerService
  ) { }

  ngOnInit() {
  }

  createPlayer() {
    this.ps.player = new Player(
      this.nameInput,
      this.portraitInput,
      this.classInput,
      { strength: 1, dexterity: 1, constitution: 1, intelligence: 1, initiative: 1 }
    );
    this.nav.uiCard.next({ face: 'front', view: 'roll-stats', flip: false });
  }
}
