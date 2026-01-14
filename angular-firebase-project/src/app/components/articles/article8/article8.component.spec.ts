import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Article8Component } from './article8.component';

describe('Article8Component', () => {
  let component: Article8Component;
  let fixture: ComponentFixture<Article8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Article8Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Article8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
