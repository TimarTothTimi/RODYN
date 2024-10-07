import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Artcicle6Component } from './artcicle6.component';

describe('Artcicle6Component', () => {
  let component: Artcicle6Component;
  let fixture: ComponentFixture<Artcicle6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Artcicle6Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Artcicle6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
