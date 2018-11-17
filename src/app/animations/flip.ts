import { animation, trigger, transition, animate, style, state } from '@angular/animations';

export const flip =
  trigger('flip', [
    state('back', style({transform: 'rotateY(0deg)'})),
    state('front', style({transform: 'rotateY(180deg)'})),
    transition('back <=> front', [
      animate('500ms ease-out')
    ])
  ]);
