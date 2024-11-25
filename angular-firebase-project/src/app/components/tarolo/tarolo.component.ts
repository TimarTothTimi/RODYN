import { ShoppingBasketService } from "./../../services/shopping-basket.service";
import { Firestore } from "@angular/fire/firestore";
import { ProductService } from "./../../services/product.service";
import { Component } from "@angular/core";
import { Product } from "../../models/product";

@Component({
  selector: "app-tarolo",
  templateUrl: "./tarolo.component.html",
  styleUrl: "./tarolo.component.scss",
})
export class TaroloComponent {
  products: Product[] = [];
  constructor(
    private productService: ProductService,
    private shoppingBasketService: ShoppingBasketService
  ) {
    this.refresh();
  }

  refresh(): void {
    this.productService.getTaroloButorok().subscribe((products) => {
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

  // addToBasket(product: Product) {
  //   this.shoppingBasketService.setBasketItem(product.id, product.category, 1);
  // }
}
