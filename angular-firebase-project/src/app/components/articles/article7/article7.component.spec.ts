import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Article7Component } from './article7.component';

describe('Article7Component', () => {
  let component: Article7Component;
  let fixture: ComponentFixture<Article7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Article7Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Article7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
