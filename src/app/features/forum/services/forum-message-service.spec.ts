import { TestBed } from '@angular/core/testing';

import { ForumMessageService } from './forum-message-service';

describe('ForumMessageService', () => {
  let service: ForumMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForumMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
