import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing.module";

// Alap komponensek
import { HeaderComponent } from "./components/header/header.component";
import { NavComponent } from "./components/nav/navMain.component";
import { HomeComponent } from "./components/home/home.component";

// Cikkek
import { ArticlesComponent } from "./components/articles/articles.component";
import { ArticlesNavComponent } from "./components/nav/components-nav/components-nav.component";
import { Article1Component } from "./components/articles/article1/article1.component";
import { Article2Component } from "./components/articles/article2/article2.component";
import { Article3Component } from "./components/articles/article3/article3.component";
import { Article4Component } from "./components/articles/article4/article4.component";
import { Article5Component } from "./components/articles/article5/article5.component";
import { Article6Component } from "./components/articles/article6/article6.component";
import { Article7Component } from "./components/articles/article7/article7.component";
import { Article8Component } from "./components/articles/article8/article8.component";
import { Article9Component } from "./components/articles/article9/article9.component";

// Termékek / UI
import { ImageSliderComponent } from "./components/image-slider/image-slider.component";
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { ProductFormComponent } from "./components/product-form/product-form.component";
import { ProductPageComponent } from "./components/product-page/product-page.component";

// Felhasználók / katalógus
import { CustomerRegComponent } from "./components/customer-reg/customer-reg.component";
import { CatalogComponent } from "./components/catalog/catalog.component";

// Bútorok
import { FotelekComponent } from "./components/fotelek/fotelek.component";
import { AsztalokComponent } from "./components/asztalok/asztalok.component";
import { BarszekekComponent } from "./components/barszekek/barszekek.component";
import { SzekekComponent } from "./components/szekek/szekek.component";
import { RecepcioComponent } from "./components/recepcio/recepcio.component";
import { TaroloComponent } from "./components/tarolo/tarolo.component";

// Admin
import { AdminComponent } from "./components/admin/admin.component";
import { FooterComponent } from "./components/footer/footer.components";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    HomeComponent,
    ArticlesComponent,
    ArticlesNavComponent,
    Article1Component,
    Article2Component,
    Article3Component,
    Article4Component,
    Article5Component,
    Article6Component,
    Article7Component,
    Article8Component,
    Article9Component,
    ImageSliderComponent,
    ProductCardComponent,
    ProductFormComponent,
    ProductPageComponent,
    CustomerRegComponent,
    CatalogComponent,
    FotelekComponent,
    AsztalokComponent,
    BarszekekComponent,
    SzekekComponent,
    RecepcioComponent,
    TaroloComponent,
    AdminComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
