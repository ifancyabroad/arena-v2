import { animation, trigger, transition, animate, style, state } from '@angular/animations';

export const slideinout =
  trigger('slideinout', [
    state('void', style({opacity: 0, transform: 'translateX(-15px)'})),
    transition(':enter, :leave', [
      animate('400ms ease-out')
    ])
  ]);
