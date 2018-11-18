import { Injectable } from '@angular/core';
import { Player } from '../classes/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  player: Player; // Current player object

  constructor() { }
}
