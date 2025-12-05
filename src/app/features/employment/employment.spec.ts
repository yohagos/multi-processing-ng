import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Employment } from './employment';

describe('Employment', () => {
  let component: Employment;
  let fixture: ComponentFixture<Employment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Employment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Employment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
