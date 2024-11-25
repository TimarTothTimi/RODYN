import { Component, OnDestroy, OnInit } from "@angular/core";
import { Product } from "../../models/product";
import { Observable, Subject, takeUntil } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { ProductService } from "../../services/product.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-product-page",
  templateUrl: "./product-page.component.html",
  styleUrl: "./product-page.component.scss",
})
export class ProductPageComponent implements OnInit, OnDestroy {
  public loggedInStatus$?: Observable<boolean | null>;
  public userEmail$?: Observable<string | null>;
  public product?: Product;
  destroy$: Subject<void> = new Subject<void>();
  relatedProducts: Product[] = [];

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loggedInStatus$ = this.authService.loggedInStatus$;
    this.userEmail$ = this.authService.userEmail$;
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((paramMap) => {
      const productId = paramMap.get("id");
      const productCategory = paramMap.get("category");
      if (productCategory && productId) {
        this.productService
          .getProduct(productCategory, productId)
          .pipe(takeUntil(this.destroy$))
          .subscribe((product) => {
            this.product = product;
          });
      }
      if (productCategory) {
        this.productService
          .getProducts(productCategory)
          .pipe(takeUntil(this.destroy$))
          .subscribe((products) => {
            this.relatedProducts = products
              .filter((product) => product.id !== productId)
              .slice(0, 3);
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
