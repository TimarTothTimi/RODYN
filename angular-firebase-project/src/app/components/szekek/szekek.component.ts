import { ProductService } from "./../../product.service";
import { Product } from "./../../models/product";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-szekek",
  templateUrl: "./szekek.component.html",
  styleUrls: ["./szekek.component.scss"],
})
export class SzekekComponent implements OnInit {
  szekek: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService
      .getProductsByCategory("chairs")
      .subscribe((products: Product[]) => {
        this.szekek = products || [];
      });
  }
}
