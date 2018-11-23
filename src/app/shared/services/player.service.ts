import { Injectable } from '@angular/core';
import { Player } from '../classes/player';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  player: Player; // Current player object
  characterCreated: Subject<boolean> = new Subject<boolean>(); // Observable for creating the character

  constructor() { }
}
