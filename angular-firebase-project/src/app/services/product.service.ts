import { Injectable } from "@angular/core";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  Firestore,
  getDocs,
  setDoc,
} from "@angular/fire/firestore";
import { from, map, Observable } from "rxjs";
import { Product } from "../models/product";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  // private apiUrl = "http://localhost:3000/products"; // Backend URL

  // private readonly szekekCollestionRef = collection(this.firestore, "szekek");

  // constructor(private http: HttpClient, private firestore: Firestore) {}

  // addProduct(product: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, product);
  // }

  // getProdut(): Observable<Product[]> {
  //   return from(getDocs(this.szekekCollestionRef)).pipe(
  //     map((snapshot) => {
  //       const resultList = snapshot.docs.map((doc) => {
  //         const szekekData: Product = doc.data() as Product;
  //         return szekekData;
  //       });
  //       return resultList;
  //     })
  //   );
  // }

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

  creatProduct(product: Product): Observable<DocumentData> {
    if (product.category === "szekek") {
      return from(addDoc(this.szekekCollestionRef, product));
    } else if (product.category === "fotelek") {
      return from(addDoc(this.fotelekCollestionRef, product));
    } else if (product.category === "recepciosAsztalok") {
      return from(addDoc(this.recepciosAsztalokCollestionRef, product));
    } else if (product.category === "barszekek") {
      return from(addDoc(this.barszekekCollestionRef, product));
    } else if (product.category === "asztalok") {
      return from(addDoc(this.asztalokCollestionRef, product));
    } else {
      return from(addDoc(this.taroloButorokCollestionRef, product));
    }
  }

  getProducts(category: string): Observable<Product[]> {
    const collectionRef = collection(this.firestore, category);
    return from(getDocs(collectionRef)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => {
          return {
            ...(doc.data() as Product),
            id: doc.id,
          };
        })
      )
    );
  }

  getSzekek(): Observable<Product[]> {
    return from(getDocs(this.szekekCollestionRef)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => {
          return {
            ...(doc.data() as Product),
            id: doc.id,
          };
        })
      )
    );
  }
  getFotelek(): Observable<Product[]> {
    return from(getDocs(this.fotelekCollestionRef)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => {
          return {
            ...(doc.data() as Product),
            id: doc.id,
          };
        })
      )
    );
  }
  getRecepciosAsztalok(): Observable<Product[]> {
    return from(getDocs(this.recepciosAsztalokCollestionRef)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => {
          return {
            ...(doc.data() as Product),
            id: doc.id,
          };
        })
      )
    );
  }
  getBarszekek(): Observable<Product[]> {
    return from(getDocs(this.barszekekCollestionRef)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => {
          return {
            ...(doc.data() as Product),
            id: doc.id,
          };
        })
      )
    );
  }
  getAsztalok(): Observable<Product[]> {
    return from(getDocs(this.asztalokCollestionRef)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => {
          return {
            ...(doc.data() as Product),
            id: doc.id,
          };
        })
      )
    );
  }
  getTaroloButorok(): Observable<Product[]> {
    return from(getDocs(this.taroloButorokCollestionRef)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => {
          return {
            ...(doc.data() as Product),
            id: doc.id,
          };
        })
      )
    );
  }

  // DELETE
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

  //UPDATE
  updateProduct(product: Product): Observable<void> {
    const path = `${product.category}/${product.id}`; //figyelni kell a helyes elérési útra!!!
    const productDoc = doc(this.firestore, path);
    return from(setDoc(productDoc, product));
  }
}
