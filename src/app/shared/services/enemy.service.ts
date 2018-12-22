import { Injectable } from '@angular/core';
import { Enemy } from '../classes/enemy';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnemyService {

  enemy: Enemy; // Current enemy object
  enemyCreated: Subject<boolean> = new Subject<boolean>(); // Observable for creating the character
  enemyList: any; // List of enemies

  constructor(private http: HttpClient) { }

  getEnemies() {
    if (this.enemyList) {
      return of(this.enemyList);
    } else {
      return this.http.get('./assets/data/enemies.json').pipe(
        map(data => {
          this.enemyList = data;
          return this.enemyList;
        })
      );
    }
  }
}
