import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SzekekComponent } from './szekek.component';

describe('SzekekComponent', () => {
  let component: SzekekComponent;
  let fixture: ComponentFixture<SzekekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SzekekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SzekekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
