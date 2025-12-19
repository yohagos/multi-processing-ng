import { TestBed } from '@angular/core/testing';

import { ForumLoginService } from './forum-login-service';

describe('ForumLoginService', () => {
  let service: ForumLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForumLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
