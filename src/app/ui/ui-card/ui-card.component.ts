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

  cardFace = 'back'; // Which side is showing?
  backFace = 'hidden'; // What view is on the front
  frontFace = 'character-create'; // What view is on the back

  constructor(private nav: NavigationService) { }

  ngOnInit() {
    // Change view when data received
    this.nav.uiCard.subscribe(nav => {
      if (nav['face'] === 'front') {
        this.frontFace = nav['view'];
      } else if (nav['face'] === 'back') {
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

  // Start the game
  proceed() {
    this.nav.uiCard.next({ face: 'front', view: 'character-create', flip: true });
  }

}
