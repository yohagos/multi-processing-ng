import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumToolbar } from './forum-toolbar';

describe('ForumToolbar', () => {
  let component: ForumToolbar;
  let fixture: ComponentFixture<ForumToolbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForumToolbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumToolbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
