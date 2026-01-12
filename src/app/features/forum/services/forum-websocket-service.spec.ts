import { TestBed } from '@angular/core/testing';

import { ForumWebsocketService } from './forum-websocket-service';

describe('ForumWebsocketService', () => {
  let service: ForumWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForumWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
