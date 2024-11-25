import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  setDoc,
  DocumentReference,
  DocumentData,
} from "@angular/fire/firestore";
import { from, map, Observable } from "rxjs";
import { Product } from "../models/product";

@Injectable({
  providedIn: "root", // Globálisan elérhetővé teszi a szolgáltatást
})
export class ProductService {
  constructor(private firestore: Firestore) {}

  /**
   * Kategóriánkénti termékek lekérdezése.
   * @param category A kategória neve
   * @returns Observable a terméklistával
   */
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

  /**
   * Új termék hozzáadása egy adott kategóriához.
   * @param product A hozzáadandó termék
   * @returns Observable a dokumentumadatokkal
   */
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

  createProduct(product: Product): Observable<DocumentReference<DocumentData>> {
    if (!product.category) {
      throw new Error("Product category is required");
    }
    const collectionRef = collection(this.firestore, product.category);
    return from(addDoc(collectionRef, product));
  }
}

  /**
   * Termék törlése adott kategóriából.
   * @param productId A törlendő termék azonosítója
   * @param category A kategória neve
   * @returns Observable a törlési művelethez
   */
  deleteProduct(productId: string, category: string): Observable<void> {
    if (!category || !productId) {
      throw new Error("Category and productId are required");
    }
    const productDocRef = doc(this.firestore, `${category}/${productId}`);
    return from(deleteDoc(productDocRef));
  }

  /**
   * Termék frissítése.
   * @param product A frissítendő termék
   * @returns Observable a frissítési művelethez
   */
  updateProduct(product: Product): Observable<void> {
    if (!product.category || !product.id) {
      throw new Error("Product category and id are required");
    }
    const productDoc = doc(this.firestore, `${product.category}/${product.id}`);
    return from(setDoc(productDoc, product));
  }