import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharacterCreateService {

  characterDetails: any;

  constructor(private http: HttpClient) { }

  getCharacterDetail() {
    if (this.characterDetails) {
      return of(this.characterDetails);
    } else {
      return this.http.get('./../../assets/data/character.json').pipe(
        map(data => {
          this.characterDetails = data;
          return this.characterDetails;
        })
      );
    }
  }
}
