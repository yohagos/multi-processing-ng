import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectChannel } from './direct-channel';

describe('DirectChannel', () => {
  let component: DirectChannel;
  let fixture: ComponentFixture<DirectChannel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectChannel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectChannel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
