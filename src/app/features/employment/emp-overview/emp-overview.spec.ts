import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpOverview } from './emp-overview';

describe('EmpOverview', () => {
  let component: EmpOverview;
  let fixture: ComponentFixture<EmpOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
