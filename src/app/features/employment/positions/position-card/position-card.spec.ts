import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionCard } from './position-card';

describe('PositionCard', () => {
  let component: PositionCard;
  let fixture: ComponentFixture<PositionCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
