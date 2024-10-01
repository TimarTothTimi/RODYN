import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Artcicle4Component } from './artcicle4.component';

describe('Artcicle4Component', () => {
  let component: Artcicle4Component;
  let fixture: ComponentFixture<Artcicle4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Artcicle4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Artcicle4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
