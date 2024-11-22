import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaroloComponent } from './tarolo.component';

describe('TaroloComponent', () => {
  let component: TaroloComponent;
  let fixture: ComponentFixture<TaroloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaroloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaroloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
