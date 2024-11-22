import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { collection, Firestore, getDocs } from "@angular/fire/firestore";
import { from, map, Observable } from "rxjs";
import { Product } from "../models/product";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private apiUrl = "http://localhost:3000/products"; // Backend URL

  private readonly szekekCollestionRef = collection(this.firestore, "szekek");

  constructor(private http: HttpClient, private firestore: Firestore) {}

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }

  getProdut(): Observable<Product[]> {
    return from(getDocs(this.szekekCollestionRef)).pipe(
      map((snapshot) => {
        const resultList = snapshot.docs.map((doc) => {
          const szekekData: Product = doc.data() as Product;
          return szekekData;
        });
        return resultList;
      })
    );
  }
}
