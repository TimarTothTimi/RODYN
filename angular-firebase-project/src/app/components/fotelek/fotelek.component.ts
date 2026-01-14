import { Component, OnDestroy, OnInit } from "@angular/core";
import { Product } from "../../models/product";
import { ProductService } from "../../services/product.service";
import { ShoppingBasketService } from "../../services/shopping-basket.service";
import { AuthService } from "../../services/auth.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-fotelek",
  templateUrl: "./fotelek.component.html",
  styleUrl: "./fotelek.component.scss",
})
export class FotelekComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  isAdmin: boolean = false;
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private productService: ProductService,
    private shoppingBasketService: ShoppingBasketService,
    private authService: AuthService
  ) {
    this.refresh();
  }

  refresh(): void {
    this.productService
      .getFotelek()
      .pipe(takeUntil(this.destroy$))
      .subscribe((products) => {
        this.products = products;
      });
  }

  deleteProduct(product: Product): void {
    this.productService
      .deleteProduct(product.id!, product.category)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
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
    this.authService.currentUserRole
      .pipe(takeUntil(this.destroy$))
      .subscribe((role) => {
        this.isAdmin = role === "admin";
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
