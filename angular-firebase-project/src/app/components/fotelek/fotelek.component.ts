import { Component, OnInit } from "@angular/core";
import { Product } from "../../models/product";
import { ProductService } from "../../services/product.service";
import { ShoppingBasketService } from "../../services/shopping-basket.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-fotelek",
  templateUrl: "./fotelek.component.html",
  styleUrl: "./fotelek.component.scss",
})
export class FotelekComponent implements OnInit {
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
    this.productService.getFotelek().subscribe((products) => {
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
