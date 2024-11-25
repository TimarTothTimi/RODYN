import { Component, OnInit } from "@angular/core";
import { Product } from "../../models/product";
import { ProductService } from "../../services/product.service";
import { ShoppingBasketService } from "../../services/shopping-basket.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-asztalok",
  templateUrl: "./asztalok.component.html",
  styleUrl: "./asztalok.component.scss",
})
export class AsztalokComponent implements OnInit {
  products: Product[] = [];
  isAdmin: boolean = false;

  constructor(
    private productService: ProductService,
    private shoppingBasketService: ShoppingBasketService,
    private authService: AuthService
  ) {
    this.refresh();
  }

  refresh(): void {
    this.productService.getAsztalok().subscribe((products) => {
      this.products = products;
    });
  }

  deleteProduct(product: Product): void {
    this.productService.deleteProduct(product.id!, product.category).subscribe({
      next: () => {
        console.log("Product deleted!");
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.refresh();
      },
    });
  }

  ngOnInit(): void {
    this.authService.currentUserRole.subscribe((role) => {
      this.isAdmin = role === "admin";
    });
  }
}
