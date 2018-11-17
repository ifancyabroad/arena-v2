import { Component, OnInit } from '@angular/core';
import { flip } from '../../animations/flip';

@Component({
  selector: 'app-enemy-card',
  templateUrl: './enemy-card.component.html',
  styleUrls: ['./enemy-card.component.scss'],
  animations: [flip]
})
export class EnemyCardComponent implements OnInit {

  cardFace = 'back'; // Card state

  constructor() { }

  ngOnInit() {
  }

  // Flip card
  flipCard() {
    this.cardFace === 'back' ? this.cardFace = 'front' : this.cardFace = 'back';
  }

}
