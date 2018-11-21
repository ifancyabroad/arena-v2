import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../shared/services/navigation.service';
import { flip } from '../../animations/flip';

@Component({
  selector: 'app-enemy-card',
  templateUrl: './enemy-card.component.html',
  styleUrls: ['./enemy-card.component.scss'],
  animations: [flip]
})
export class EnemyCardComponent implements OnInit {

  cardFace = 'back'; // Card state

  constructor(private nav: NavigationService) { }

  ngOnInit() {
    // Change view when data received
    this.nav.enemyCard.subscribe(nav => {
      if (nav['flip']) {
        this.flipCard();
      }
    });
  }

  // Flip card
  flipCard() {
    this.cardFace === 'back' ? this.cardFace = 'front' : this.cardFace = 'back';
  }

}
