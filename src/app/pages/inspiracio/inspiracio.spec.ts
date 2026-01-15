import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inspiracio } from './inspiracio';

describe('Inspiracio', () => {
  let component: Inspiracio;
  let fixture: ComponentFixture<Inspiracio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inspiracio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Inspiracio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
