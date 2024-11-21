import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  deleteProduct(id: string, category: string) {
    throw new Error("Method not implemented.");
  }
  private dataUrl = "assets/szekek.json";
  getSzekek: any;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(this.dataUrl);
  }
}
