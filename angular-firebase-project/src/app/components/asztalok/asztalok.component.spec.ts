import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsztalokComponent } from './asztalok.component';

describe('AsztalokComponent', () => {
  let component: AsztalokComponent;
  let fixture: ComponentFixture<AsztalokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsztalokComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsztalokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
