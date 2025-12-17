import { TestBed } from '@angular/core/testing';

import { ForumAdapterService } from './forum-adapter-service';

describe('ForumAdapterService', () => {
  let service: ForumAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForumAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
