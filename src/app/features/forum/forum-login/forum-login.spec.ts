import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumLogin } from './forum-login';

describe('ForumLogin', () => {
  let component: ForumLogin;
  let fixture: ComponentFixture<ForumLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForumLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
