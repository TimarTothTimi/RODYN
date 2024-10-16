import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app.routing.module";
import { AppComponent } from "./app.component";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { ArticlesComponent } from "./components/articles/articles.component";
import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from "./components/home/home.component";
import { NavComponent } from "./components/nav/navMain.component";
import { Article1Component } from "./components/articles/article1/article1.component";
import { Article2Component } from "./components/articles/article2/article2.component";
import { Article3Component } from "./components/articles/article3/article3.component";
import { Article4Component } from "./components/articles/article4/article4.component";
import { Article5Component } from "./components/articles/article5/article5.component";
import { Article6Component } from "./components/articles/article6/article6.component";
import { Article7Component } from "./components/articles/article7/article7.component";
import { Article8Component } from "./components/articles/article8/article8.component";
import { Article9Component } from "./components/articles/article9/article9.component";
import { ProductsComponent } from "./components/products/products.component";
import { SzekekComponent } from "./components/szekek/szekek.component";
import { ArticlesNavComponent } from "./components/nav/components-nav/components-nav.component";
import { ToastrModule } from "ngx-toastr";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { CustomerRegComponent } from "./components/customer-reg/customer-reg.component";
import { CatalogComponent } from "./components/catalog/catalog.component";
import { FotelekComponent } from "./components/fotelek/fotelek.component";
import { AsztalokComponent } from "./components/asztalok/asztalok.component";
import { BarszekekComponent } from "./components/barszekek/barszekek.component";
import { RecepcioComponent } from "./components/recepcio/recepcio.component";
import { TaroloComponent } from "./components/tarolo/tarolo.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NavComponent,
    ArticlesComponent,
    Article1Component,
    Article2Component,
    Article3Component,
    Article4Component,
    Article5Component,
    Article6Component,
    Article7Component,
    Article8Component,
    Article9Component,
    ArticlesComponent,
    ProductsComponent,
    SzekekComponent,
    ArticlesNavComponent,
    SignInComponent,
    CustomerRegComponent,
    CatalogComponent,
    FotelekComponent,
    AsztalokComponent,
    BarszekekComponent,
    ProductsComponent,
    RecepcioComponent,
    SzekekComponent,
    TaroloComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: "AIzaSyAedo5PI4iVpLdpAAyV2OTSjhgl7pyVoIY",
        authDomain: "angular-firebase-project-e901f.firebaseapp.com",
        projectId: "angular-firebase-project-e901f",
        storageBucket: "angular-firebase-project-e901f.appspot.com",
        messagingSenderId: "929539061263",
        appId: "1:929539061263:web:06c3853913c27f235f957a",
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
