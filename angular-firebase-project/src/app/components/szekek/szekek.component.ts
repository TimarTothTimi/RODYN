import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { Observable } from "rxjs";
import { Product } from "../../models/product";

@Component({
  selector: "app-szekek",
  templateUrl: "./szekek.component.html",
  styleUrl: "./szekek.component.scss",
})
export class SzekekComponent implements OnInit {
  constructor(private productService: ProductService) {}
  szekek$?: Observable<Product[]>;

  ngOnInit(): void {
    this.szekek$ = this.productService.getProdut();
  }
}
