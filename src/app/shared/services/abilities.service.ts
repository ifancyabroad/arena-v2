import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AbilitiesService {

  abilities: any; // List of abilities

  constructor(private http: HttpClient) { }

  getAbilities() {
    if (this.abilities) {
      return of(this.abilities);
    } else {
      return this.http.get('./../../assets/data/abilities.json').pipe(
        map(data => {
          this.abilities = data;
          return this.abilities;
        })
      );
    }
  }
}
