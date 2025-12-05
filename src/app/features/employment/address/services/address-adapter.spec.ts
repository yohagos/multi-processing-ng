import { TestBed } from '@angular/core/testing';

import { AddressAdapter } from './address-adapter';

describe('AddressAdapter', () => {
  let service: AddressAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
