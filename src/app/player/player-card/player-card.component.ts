import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../shared/services/navigation.service';
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

  constructor(private nav: NavigationService) { }

  ngOnInit() {
    // Change view when data received
    this.nav.playerCard.subscribe(nav => {
      if (nav['face'] === 'back') {
        this.backFace = nav['view'];
      }

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
