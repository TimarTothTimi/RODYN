import { Component, OnInit } from "@angular/core";
import { collection, collectionData, Firestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { TestModel } from "./models/test.model";
import { ProductService } from "./services/product.service";
import { Szekek } from "./models/szekek.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "angular-firebase-project";
  testCollectionRef: any;
  products: Szekek[] = [];

  constructor(
    private firestore: Firestore,
    private productService: ProductService
  ) {
    this.testCollectionRef = collection(this.firestore, "test");
  }

  ngOnInit(): void {
    this.productService.getSzekek().subscribe((data) => {
      this.products = data;
    });
  }

  getTests(): Observable<TestModel[]> {
    return collectionData<TestModel>(this.testCollectionRef, { idField: "id" });
  }
}
