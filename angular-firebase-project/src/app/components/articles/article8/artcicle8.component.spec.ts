import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Artcicle8Component } from './artcicle8.component';

describe('Artcicle8Component', () => {
  let component: Artcicle8Component;
  let fixture: ComponentFixture<Artcicle8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Artcicle8Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Artcicle8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
