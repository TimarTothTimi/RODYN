import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarszekekComponent } from './barszekek.component';

describe('BarszekekComponent', () => {
  let component: BarszekekComponent;
  let fixture: ComponentFixture<BarszekekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarszekekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarszekekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
