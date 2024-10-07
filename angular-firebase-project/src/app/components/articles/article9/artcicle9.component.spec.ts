import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Artcicle9Component } from './artcicle9.component';

describe('Artcicle9Component', () => {
  let component: Artcicle9Component;
  let fixture: ComponentFixture<Artcicle9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Artcicle9Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Artcicle9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
