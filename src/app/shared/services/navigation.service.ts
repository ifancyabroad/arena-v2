import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  uiCard: Subject<Object> = new Subject<Object>();
  playerCard: Subject<Object> = new Subject<Object>();
  enemyCard: Subject<Object> = new Subject<Object>();

  constructor() { }

  // proceed(card: Subject<Object>, settings: Object) {
  //   card.next(settings);
  // }
}
