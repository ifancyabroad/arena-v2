import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../shared/services/navigation.service';
import { CharacterCreateService } from '../character-create/character-create.service';
import { PlayerService } from '../../../shared/services/player.service';
import { Player } from '../../../shared/classes/player';
import { UtilitiesService } from '../../../shared/services/utilities.service';

@Component({
  selector: 'app-character-create',
  templateUrl: './character-create.component.html',
  styleUrls: ['./character-create.component.scss']
})
export class CharacterCreateComponent implements OnInit {

  nameInput: string;
  portraitInput: string;
  classInput: any;

  portraits;
  classes;

  constructor(
    private nav: NavigationService,
    private cc: CharacterCreateService,
    private ps: PlayerService,
    private dice: UtilitiesService
  ) { }

  ngOnInit() {
    this.cc.getCharacterDetail().subscribe(data => {
      this.portraits = data['portraits'];
      this.classes = data['classes'];
    });
  }

  setStats(maxStats) {
    const stats: Object = {};
    for (let stat of Object.keys(maxStats)) {
      stats[stat] = this.dice.roll(maxStats[stat] - 5, maxStats[stat]);
    }
    return stats;
  }

  createPlayer() {
    this.portraitInput = this.portraits[0];
    this.classInput = this.classes[0];

    this.ps.player = new Player(
      this.nameInput,
      this.portraitInput,
      this.classInput,
      this.setStats(this.classInput['maxStats'])
    );

    this.ps.characterCreated.next(true);
    this.nav.uiCard.next({ face: 'front', view: 'roll-stats', flip: false });
  }
}
