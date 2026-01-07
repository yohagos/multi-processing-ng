import { TestBed } from '@angular/core/testing';

import { ForumChannelService } from './forum-channel-service';

describe('ForumChannelService', () => {
  let service: ForumChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForumChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
