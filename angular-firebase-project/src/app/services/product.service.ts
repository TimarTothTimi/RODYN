import { Injectable } from "@angular/core";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  where,
  setDoc,
  DocumentReference,
  DocumentData,
} from "@angular/fire/firestore";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Product } from "../models/product";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private firestore: Firestore) {}

  private readonly szekekCollestionRef = collection(this.firestore, "szekek");
  private readonly fotelekCollestionRef = collection(this.firestore, "fotelek");
  private readonly recepciosAsztalokCollestionRef = collection(
    this.firestore,
    "recepciosAsztalok"
  );
  private readonly barszekekCollestionRef = collection(
    this.firestore,
    "barszekek"
  );
  private readonly asztalokCollestionRef = collection(
    this.firestore,
    "asztalok"
  );
  private readonly taroloButorokCollestionRef = collection(
    this.firestore,
    "taroloButorok"
  );

  creatProduct(product: Product): Observable<DocumentReference<DocumentData>> {
    if (!product.category) {
      throw new Error("Product category is required");
    }
    const collectionRef = collection(this.firestore, product.category);
    return from(addDoc(collectionRef, product));
  }

  getProducts(category: string): Observable<Product[]> {
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

  getProduct(category: string, id: string): Observable<Product> {
    const collectionRef = collection(this.firestore, category);
    const productDocRef = doc(this.firestore, `${collectionRef.path}/${id}`);
    return from(getDoc(productDocRef)).pipe(
      map((snapshot) => {
        const result = snapshot.data() as Product;
        result.id = snapshot.id;
        return result;
      })
    );
  }

  getSzekek(): Observable<Product[]> {
    return from(getDocs(this.szekekCollestionRef)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => ({
          ...(doc.data() as Product),
          id: doc.id,
        }))
      )
    );
  }

  getFotelek(): Observable<Product[]> {
    return from(getDocs(this.fotelekCollestionRef)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => ({
          ...(doc.data() as Product),
          id: doc.id,
        }))
      )
    );
  }

  getRecepciosAsztalok(): Observable<Product[]> {
    return from(getDocs(this.recepciosAsztalokCollestionRef)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => ({
          ...(doc.data() as Product),
          id: doc.id,
        }))
      )
    );
  }

  getBarszekek(): Observable<Product[]> {
    return from(getDocs(this.barszekekCollestionRef)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => ({
          ...(doc.data() as Product),
          id: doc.id,
        }))
      )
    );
  }

  getAsztalok(): Observable<Product[]> {
    return from(getDocs(this.asztalokCollestionRef)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => ({
          ...(doc.data() as Product),
          id: doc.id,
        }))
      )
    );
  }

  getTaroloButorok(): Observable<Product[]> {
    return from(getDocs(this.taroloButorokCollestionRef)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => ({
          ...(doc.data() as Product),
          id: doc.id,
        }))
      )
    );
  }

  deleteProduct(productId: string, category: string): Observable<void> {
    const collectionRef =
      category === "szekek"
        ? this.szekekCollestionRef
        : category === "fotelek"
        ? this.fotelekCollestionRef
        : category === "recepciosAsztalok"
        ? this.recepciosAsztalokCollestionRef
        : category === "barszekek"
        ? this.barszekekCollestionRef
        : category === "asztalok"
        ? this.asztalokCollestionRef
        : category === "taroloButorok"
        ? this.taroloButorokCollestionRef
        : null;

    if (collectionRef) {
      const productDocRef = doc(
        this.firestore,
        `${collectionRef.path}/${productId}`
      );
      return from(deleteDoc(productDocRef));
    } else {
      throw new Error("Invalid product category");
    }
  }

  updateProduct(product: Product): Observable<void> {
    const path = `${product.category}/${product.id}`;
    const productDoc = doc(this.firestore, path);
    return from(setDoc(productDoc, product));
  }

  searchProducts(searchQuery: string): Observable<Product[]> {
    const collectionRef = collection(this.firestore, "products");
    const q = query(
      collectionRef,
      where("name", ">=", searchQuery),
      where("name", "<=", searchQuery + "\uf8ff")
    );
    return from(getDocs(q)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => ({
          ...(doc.data() as Product),
          id: doc.id,
        }))
      )
    );
  }
}
