import { Component, OnInit } from '@angular/core';
import { flip } from '../../animations/flip';
import { NavigationService } from '../../shared/services/navigation.service';

@Component({
  selector: 'app-ui-card',
  templateUrl: './ui-card.component.html',
  styleUrls: ['./ui-card.component.scss'],
  animations: [flip]
})
export class UiCardComponent implements OnInit {

  cardFace = 'back'; // Card state for animation
  backFace = 'hidden'; // Back face state
  frontFace = 'character-create'; // Front face state

  constructor(private nav: NavigationService) { }

  ngOnInit() {
    // Change view when data received
    this.nav.uiCard.subscribe(nav => {
      switch (nav['face']) {
        case 'front':
          this.frontFace = nav['view'];
          break;

        case 'back':
          this.backFace = nav['view'];
          break;
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
