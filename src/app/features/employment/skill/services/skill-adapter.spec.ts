import { TestBed } from '@angular/core/testing';

import { SkillAdapter } from './skill-adapter';

describe('SkillAdapter', () => {
  let service: SkillAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
