import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotelekComponent } from './fotelek.component';

describe('FotelekComponent', () => {
  let component: FotelekComponent;
  let fixture: ComponentFixture<FotelekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FotelekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FotelekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
