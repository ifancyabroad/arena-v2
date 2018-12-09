import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../shared/services/navigation.service';
import { CharacterCreateService } from '../character-create/character-create.service';
import { PlayerService } from '../../../shared/services/player.service';
import { Player } from '../../../shared/classes/player';
import { UtilitiesService } from '../../../shared/services/utilities.service';
import { AbilitiesService } from 'src/app/shared/services/abilities.service';

@Component({
  selector: 'app-character-create',
  templateUrl: './character-create.component.html',
  styleUrls: ['./character-create.component.scss']
})
export class CharacterCreateComponent implements OnInit {

  nameInput: string; // Current selected name
  portraitInput: string; // Current selected portrait
  classInput: any; // Current selected class

  portraits: Array<string>; // List of portraits
  classes: Object[]; // List of classes
  abilities: any; // List of abilities

  constructor(
    private nav: NavigationService,
    private cc: CharacterCreateService,
    private as: AbilitiesService,
    private ps: PlayerService,
    private dice: UtilitiesService
  ) { }

  ngOnInit() {
    this.cc.getCharacterDetail().subscribe(data => {
      this.portraits = data['portraits'];
      this.portraitInput = this.portraits[0];
      this.classes = data['classes'];
      this.classInput = this.classes[0];
    });

    this.as.getAbilities().subscribe(data => this.abilities = data);
  }

  // Browsing portraits and classes
  changeSelection(type, direction) {
    direction = direction > type.length - 1 ? 0 : direction < 0 ? type.length - 1 : direction;
    if (type === this.classes) {
      this.classInput = this.classes[direction];
    } else if (type === this.portraits) {
      this.portraitInput = this.portraits[direction];
    }
  }

  // Set initial stats
  setStats(maxStats) {
    const stats: Object = {};
    for (let stat of Object.keys(maxStats)) {
      stats[stat] = this.dice.roll(maxStats[stat] - 5, maxStats[stat]);
    }
    return stats;
  }

  // Set initial abilities
  setAbilities = (className) => this.abilities['basic'].concat(this.abilities[className].filter(ability => ability.level < 1));

  // Create player
  createPlayer() {
    this.ps.player = new Player(
      this.nameInput,
      this.portraitInput,
      this.classInput,
      this.setStats(this.classInput['maxStats']),
      this.setAbilities(this.classInput['name'].toLowerCase())
    );

    this.ps.characterCreated.next(true);
    this.nav.uiCard.next({ face: 'front', view: 'roll-stats', flip: false });
  }
}
