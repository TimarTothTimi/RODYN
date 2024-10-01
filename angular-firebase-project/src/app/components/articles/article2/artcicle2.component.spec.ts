import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Artcicle2Component } from './artcicle2.component';

describe('Artcicle2Component', () => {
  let component: Artcicle2Component;
  let fixture: ComponentFixture<Artcicle2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Artcicle2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Artcicle2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
