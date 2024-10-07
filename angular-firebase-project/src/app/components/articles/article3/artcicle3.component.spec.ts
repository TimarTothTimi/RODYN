import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Artcicle3Component } from './artcicle3.component';

describe('Artcicle3Component', () => {
  let component: Artcicle3Component;
  let fixture: ComponentFixture<Artcicle3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Artcicle3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Artcicle3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
