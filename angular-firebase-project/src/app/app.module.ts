import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CenterSectionComponent } from "./components/center-section/center-section.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app.routing.module";
import { AppComponent } from "./app.component";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from "./components/home/home.component";
import { NavComponent } from "./components/nav/nav.component";
import * as article1Component from "./components/articles/article1/article1.component";
import { Article2Component } from "./components/articles/article2/article2.component";
import { Article3Component } from "./components/articles/article3/article3.component";
import { Article4Component } from "./components/articles/article4/article4.component";
import { Article5Component } from "./components/articles/article5/article5.component";
import { Article6Component } from "./components/articles/article6/article6.component";
import { Article7Component } from "./components/articles/article7/article7.component";
import { Article8Component } from "./components/articles/article8/article8.component";
import { Article9Component } from "./components/articles/article9/article9.component";
import { FloatingSectionComponent } from "./components/floating-section/floating-section";
import { ArticlesComponent } from "./components/articles/articles.component";
import { FooterComponent } from "./components/footer/footer.components";
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NavComponent,
    article1Component.Article1Component,
    Article2Component,
    Article3Component,
    Article4Component,
    Article5Component,
    Article6Component,
    Article7Component,
    Article8Component,
    Article9Component,
    CenterSectionComponent,
    FloatingSectionComponent,
    ArticlesComponent,
    FooterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, CommonModule],
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
