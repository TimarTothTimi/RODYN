import { Component, OnInit, Inject } from "@angular/core";
import { ProductService } from "../product.service";
import { Product } from "../models/product";

@Component({
  selector: "app-szekek",
  templateUrl: "./szekek.component.html",
  styleUrls: ["./szekek.component.scss"],
})
export class SzekekComponent implements OnInit {
  szekek: Product[] = [];

  constructor(@Inject(ProductService) private productService: ProductService) {}

  ngOnInit() {
    this.productService.getSzekek().subscribe({
      next: (data: Product[]) => {
        this.szekek = data;
      },
      error: (err: any) => {
        console.error("Failed to fetch products:", err);
      },
    });
  }
}
