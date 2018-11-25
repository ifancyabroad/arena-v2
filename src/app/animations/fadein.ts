import { animation, trigger, transition, animate, style, state } from '@angular/animations';

export const fadein =
  trigger('fadein', [
    state('void', style({opacity: 0})),
    transition(':enter', [
      animate('400ms ease-out')
    ])
  ]);