import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Artcicle7Component } from './artcicle7.component';

describe('Artcicle7Component', () => {
  let component: Artcicle7Component;
  let fixture: ComponentFixture<Artcicle7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Artcicle7Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Artcicle7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
