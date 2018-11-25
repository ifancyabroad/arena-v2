import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  state: Subject<string> = new Subject<string>();

  constructor() { }
}
