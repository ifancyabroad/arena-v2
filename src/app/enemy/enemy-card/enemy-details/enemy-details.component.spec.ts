import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnemyDetailsComponent } from './enemy-details.component';

describe('EnemyDetailsComponent', () => {
  let component: EnemyDetailsComponent;
  let fixture: ComponentFixture<EnemyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnemyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnemyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
