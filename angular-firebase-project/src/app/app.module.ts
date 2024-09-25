import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";

@NgModule({
  declarations: [AppComponent],
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
