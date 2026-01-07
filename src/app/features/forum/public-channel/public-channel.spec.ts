import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicChannel } from './public-channel';

describe('PublicChannel', () => {
  let component: PublicChannel;
  let fixture: ComponentFixture<PublicChannel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicChannel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicChannel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
