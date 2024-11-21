import { Component } from "@angular/core";
import { collection, collectionData, Firestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { TestModel } from "./models/test.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "angular-firebase-project";
  tests$: Observable<TestModel[]>;
  private readonly testCollectionRef = collection(this.firestore, "test");
  products: any[] = [];

  constructor(private firestore: Firestore) {
    this.tests$ = this.getTests();
  }

  getTests(): Observable<TestModel[]> {
    return collectionData(this.testCollectionRef, {
      idField: "id",
    }) as Observable<TestModel[]>;
  }
}
