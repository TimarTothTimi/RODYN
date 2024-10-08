import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Article6Component } from './article6.component';

describe('Article6Component', () => {
  let component: Article6Component;
  let fixture: ComponentFixture<Article6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Article6Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Article6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
