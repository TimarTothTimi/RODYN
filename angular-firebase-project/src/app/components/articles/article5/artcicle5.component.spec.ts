import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Artcicle5Component } from './artcicle5.component';

describe('Artcicle5Component', () => {
  let component: Artcicle5Component;
  let fixture: ComponentFixture<Artcicle5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Artcicle5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Artcicle5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
