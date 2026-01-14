import { Component, OnDestroy, OnInit } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { Subject, takeUntil } from "rxjs";
import { Product } from "../../models/product";
import { AuthService } from "../../services/auth.service";
import { ShoppingBasketService } from "../../services/shopping-basket.service";

@Component({
  selector: "app-szekek",
  templateUrl: "./szekek.component.html",
  styleUrls: ["./szekek.component.scss"],
})
export class SzekekComponent implements OnInit, OnDestroy {
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
      .getSzekek()
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
