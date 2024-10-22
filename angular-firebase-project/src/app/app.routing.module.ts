import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { Article1Component } from "./components/articles/article1/article1.component";
import { NgModule } from "@angular/core";
import { Article2Component } from "./components/articles/article2/article2.component";
import { Article3Component } from "./components/articles/article3/article3.component";
import { Article4Component } from "./components/articles/article4/article4.component";
import { Article5Component } from "./components/articles/article5/article5.component";
import { Article6Component } from "./components/articles/article6/article6.component";
import { Article7Component } from "./components/articles/article7/article7.component";
import { Article8Component } from "./components/articles/article8/article8.component";
import { Article9Component } from "./components/articles/article9/article9.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { CustomerRegComponent } from "./components/customer-reg/customer-reg.component";
import { CatalogComponent } from "./components/catalog/catalog.component";
import { SzekekComponent } from "./components/szekek/szekek.component";
import { FotelekComponent } from "./components/fotelek/fotelek.component";
import { RecepcioComponent } from "./components/recepcio/recepcio.component";
import { BarszekekComponent } from "./components/barszekek/barszekek.component";
import { AsztalokComponent } from "./components/asztalok/asztalok.component";
import { TaroloComponent } from "./components/tarolo/tarolo.component";
import { AdminComponent } from "./components/admin/admin.component";
import { AdminGuard } from "./guard/admin.guard";

const routes: Routes = [
  { path: "registration", component: CustomerRegComponent },
  { path: "sign-in", component: SignInComponent },
  { path: "catalog", component: CatalogComponent },
  { path: "admin", component: AdminComponent, canActivate: [AdminGuard] },
  { path: "article1", component: Article1Component },
  { path: "article2", component: Article2Component },
  { path: "article3", component: Article3Component },
  { path: "article4", component: Article4Component },
  { path: "article5", component: Article5Component },
  { path: "article6", component: Article6Component },
  { path: "article7", component: Article7Component },
  { path: "article8", component: Article8Component },
  { path: "article9", component: Article9Component },
  { path: "", component: HomeComponent },

  { path: "szekek", component: SzekekComponent },
  { path: "fotelek", component: FotelekComponent },
  { path: "recepcio", component: RecepcioComponent },
  { path: "barszekek", component: BarszekekComponent },
  { path: "asztalok", component: AsztalokComponent },
  { path: "tarolo", component: TaroloComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "top" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
