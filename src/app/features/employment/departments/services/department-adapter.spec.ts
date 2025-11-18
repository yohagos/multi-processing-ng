import { TestBed } from '@angular/core/testing';

import { DepartmentAdapter } from './department-adapter';

describe('DepartmentAdapter', () => {
  let service: DepartmentAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
