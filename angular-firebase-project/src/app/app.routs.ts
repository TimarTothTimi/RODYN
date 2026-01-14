import { provideRouter, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ArticlesComponent } from "./components/articles/articles.component";
import { Article1Component } from "./components/articles/article1/article1.component";
// importáld a többi route-ot is

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "articles", component: ArticlesComponent },
  { path: "article1", component: Article1Component },
  // további route-ok ide
];

export const appRouterProviders = provideRouter(routes);
