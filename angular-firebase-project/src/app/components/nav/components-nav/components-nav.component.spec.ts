import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ArticlesNavComponent } from "./components-nav.component";

describe("ArticlesNavComponent", () => {
  let component: ArticlesNavComponent;
  let fixture: ComponentFixture<ArticlesNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticlesNavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticlesNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
