import { Component, OnInit } from '@angular/core';
import { flip } from '../../animations/flip';

@Component({
  selector: 'app-ui-card',
  templateUrl: './ui-card.component.html',
  styleUrls: ['./ui-card.component.scss'],
  animations: [flip]
})
export class UiCardComponent implements OnInit {

  cardFace = 'back'; // Card state
  backFace = 'hidden'; // Back face state
  frontFace = 'character-create'; // Front face state

  constructor() { }

  ngOnInit() {
  }

  // Flip card
  flipCard() {
    this.cardFace === 'back' ? this.cardFace = 'front' : this.cardFace = 'back';
  }

}
