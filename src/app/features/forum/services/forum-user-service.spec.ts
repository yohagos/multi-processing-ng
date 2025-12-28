import { TestBed } from '@angular/core/testing';

import { ForumUserService } from './forum-user-service';

describe('ForumUserService', () => {
  let service: ForumUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForumUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
