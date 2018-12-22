import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AbilitiesService {

  abilities: any; // List of abilities separated by class

  constructor(private http: HttpClient) { }

  getAbilities() {
    if (this.abilities) {
      return of(this.abilities);
    } else {
      return this.http.get('./assets/data/abilities.json').pipe(
        map(data => {
          this.abilities = data;
          for (let cl of Object.keys(this.abilities)) {
            this.setAbilityDescriptions(this.abilities[cl]);
          }
          return this.abilities;
        })
      );
    }
  }

  // Create descriptions for each ability
  setAbilityDescriptions(abilities) {
    abilities.forEach(ability => {
      ability.effectDescriptions = [];
      ability.effects.forEach(effect => {
        const increases = effect.accuracy === 100 ? 'Increases' : 'Chance to increase';
        const reduces = effect.accuracy === 100 ? 'Reduces' : 'Chance to reduce';
        switch (effect.type) {
          case 'damage':
            ability.effectDescriptions.push(`${this.capitaliseFirstLetter(effect.modifier)} based attack`);
            break;

          case 'heal':
            ability.effectDescriptions.push(`Heal ${effect.value} points of damage`);
            break;

          case 'buff':
            for (let modifier of Object.keys(effect.modifiers)) {
              if (effect.modifiers[modifier] >= 0) {
                ability.effectDescriptions.push(`${increases} ${modifier} by ${effect.modifiers[modifier]} for ${effect.duration} turns`);
              } else if (effect.modifiers[modifier] < 0) {
                ability.effectDescriptions.push(`${reduces} ${modifier} by ${effect.modifiers[modifier]} for ${effect.duration} turns`);
              }
            }
            break;

          case 'debuff':
            for (let modifier of Object.keys(effect.modifiers)) {
              if (effect.modifiers[modifier] >= 0) {
                ability.effectDescriptions.push(
                  `${increases} enemy ${modifier} by ${effect.modifiers[modifier]} for ${effect.duration} turns`
                );
              } else if (effect.modifiers[modifier] < 0) {
                ability.effectDescriptions.push(
                  `${reduces} enemy ${modifier} by ${effect.modifiers[modifier]} for ${effect.duration} turns`
                );
              }
            }
            break;
        }
      });
    });
  }

  // Capitalise first letter
  capitaliseFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);
}
