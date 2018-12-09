import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerAbilitiesComponent } from './player-abilities.component';

describe('PlayerAbilitiesComponent', () => {
  let component: PlayerAbilitiesComponent;
  let fixture: ComponentFixture<PlayerAbilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerAbilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerAbilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
