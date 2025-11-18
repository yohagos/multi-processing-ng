import { TestBed } from '@angular/core/testing';

import { PositionAdapter } from './position-adapter';

describe('PositionAdapter', () => {
  let service: PositionAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PositionAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
