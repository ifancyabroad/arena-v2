import { TestBed } from '@angular/core/testing';

import { AbilitiesService } from './abilities.service';

describe('AbilitiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AbilitiesService = TestBed.get(AbilitiesService);
    expect(service).toBeTruthy();
  });
});
