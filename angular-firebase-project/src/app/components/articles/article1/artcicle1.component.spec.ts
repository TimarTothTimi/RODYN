import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Artcicle1Component } from './artcicle1.component';

describe('Artcicle1Component', () => {
  let component: Artcicle1Component;
  let fixture: ComponentFixture<Artcicle1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Artcicle1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Artcicle1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
