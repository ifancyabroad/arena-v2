import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  items: any; // List of items

  constructor(private http: HttpClient) { }

  // Get list of items
  getItems() {
    if (this.items) {
      return of(this.items);
    } else {
      return this.http.get('./assets/data/items.json').pipe(
        map(data => {
          this.items = data;
          return this.items;
        })
      );
    }
  }
}
