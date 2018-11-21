import { TestBed } from '@angular/core/testing';

import { CharacterCreateService } from './character-create.service';

describe('CharacterCreateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CharacterCreateService = TestBed.get(CharacterCreateService);
    expect(service).toBeTruthy();
  });
});
