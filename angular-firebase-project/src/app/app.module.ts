import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { ArticlesComponent } from "./components/articles/articles.component";
import { Artcicle1Component } from "./components/articles/article1/artcicle1.component";
import { Artcicle2Component } from "./components/articles/article2/artcicle2.component";
import { Artcicle3Component } from "./components/articles/article3/artcicle3.component";
import { Artcicle4Component } from "./components/articles/article4/artcicle4.component";
import { Artcicle5Component } from "./components/articles/article5/artcicle5.component";
import { Artcicle6Component } from "./components/articles/article6/artcicle6.component";
import { Artcicle7Component } from "./components/articles/article7/artcicle7.component";
import { Artcicle8Component } from "./components/articles/article8/artcicle8.component";
import { Artcicle9Component } from "./components/articles/article9/artcicle9.component";

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    Artcicle1Component,
    Artcicle2Component,
    Artcicle3Component,
    Artcicle4Component,
    Artcicle5Component,
    Artcicle6Component,
    Artcicle7Component,
    Artcicle8Component,
    Artcicle9Component,
  ],
  imports: [BrowserModule, AppRoutingModule],
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
