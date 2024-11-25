import { Injectable } from "@angular/core";
import {
  Firestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
} from "@angular/fire/firestore";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Product } from "../models/product";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private firestore: Firestore) {}

  getProductsByCategory(category: string): Observable<Product[]> {
    const collectionRef = collection(this.firestore, category);
    return from(getDocs(collectionRef)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => ({
          ...(doc.data() as Product),
          id: doc.id,
        }))
      )
    );
  }

  getBarszekek(): Observable<Product[]> {
    return this.getProductsByCategory("barszekek");
  }

  getSzekek(): Observable<Product[]> {
    return this.getProductsByCategory("szekek");
  }

  getFotelek(): Observable<Product[]> {
    return this.getProductsByCategory("fotelek");
  }

  getRecepciosAsztalok(): Observable<Product[]> {
    return this.getProductsByCategory("recepciosasztalok");
  }

  getAsztalok(): Observable<Product[]> {
    return this.getProductsByCategory("asztalok");
  }

  getTaroloButorok(): Observable<Product[]> {
    return this.getProductsByCategory("tarolobutorok");
  }

  deleteProduct(productId: string, category: string): Observable<void> {
    const productDocRef = doc(this.firestore, `${category}/${productId}`);
    return from(deleteDoc(productDocRef)).pipe(map(() => void 0));
  }

  updateProduct(product: Product): Observable<void> {
    const productDoc = doc(this.firestore, `${product.category}/${product.id}`);
    return from(setDoc(productDoc, product)).pipe(map(() => void 0));
  }
}
