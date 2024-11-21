import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Szekek } from "../models/szekek.model";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private dataUrl = "assets/szekek.json"; // A székek adatai
  private apiUrl = "https://example.com/api/products"; // Az API URL-je új termékekhez

  constructor(private http: HttpClient) {}

  /**
   * A székek adatainak lekérése a JSON fájlból.
   * @returns Observable, amely a JSON adatait tartalmazza.
   */
  getSzekek(): Observable<any[]> {
    return this.http.get<any[]>(this.dataUrl);
  }

  /**
   * Új termék hozzáadása az API-hoz.
   * @param product Az új termék adatai.
   * @returns Observable az API válaszával.
   */
  addProduct(product: { name: string; price: number }): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }
}
