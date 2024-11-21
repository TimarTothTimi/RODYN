import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { Szekek } from "./models/szekek.model";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  addProduct(newProduct: { name: string; price: number }) {
    throw new Error("Method not implemented.");
  }
  constructor(private http: HttpClient) {}

  getSzekek(): Observable<Szekek[]> {
    return this.http.get<Szekek[]>("your-api-endpoint/szekek");
  }
}
