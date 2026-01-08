import { Component, OnDestroy, OnInit } from "@angular/core";
import { Product } from "../../models/product";
import { Subject, takeUntil } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { ProductService } from "../../services/product.service";
import { ShoppingBasketService } from "../../services/shopping-basket.service";

@Component({
    selector: "app-barszekek",
    templateUrl: "./barszekek.component.html",
    styleUrls: ["./barszekek.component.scss"],
    standalone: false
})
export class BarszekekComponent implements OnInit, OnDestroy {
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
      .getBarszekek()
      .pipe(takeUntil(this.destroy$))
      .subscribe((products: Product[]) => {
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
        console.log(role);

        this.isAdmin = role === "admin";
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
