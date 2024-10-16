import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcioComponent } from './recepcio.component';

describe('RecepcioComponent', () => {
  let component: RecepcioComponent;
  let fixture: ComponentFixture<RecepcioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecepcioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecepcioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
