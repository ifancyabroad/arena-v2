import { Component, OnInit } from '@angular/core';
import { flip } from '../../animations/flip';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
  animations: [flip]
})
export class PlayerCardComponent implements OnInit {

  cardFace = 'back'; // Card state
  backFace = 'hidden'; // Back face state

  constructor() { }

  ngOnInit() {
  }

  // Flip card
  flipCard() {
    this.cardFace === 'back' ? this.cardFace = 'front' : this.cardFace = 'back';
  }

  // Set back face
  setBackFace(view: string) {
    this.backFace = view;
  }

}
