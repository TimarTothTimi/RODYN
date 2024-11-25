import { Component, OnInit } from "@angular/core";
import { Product } from "../../models/product";
import { Observable } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { ProductService } from "../../services/product.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-product-page",
  templateUrl: "./product-page.component.html",
  styleUrl: "./product-page.component.scss",
})
export class ProductPageComponent implements OnInit {
  public loggedInStatus$?: Observable<boolean | null>;
  public userEmail$?: Observable<string | null>;
  public product?: Product;

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
    const productId = this.route.snapshot.paramMap.get("id");
    const productCategory = this.route.snapshot.paramMap.get("category");
    if (productCategory && productId) {
      this.productService
        .getProduct(productCategory, productId)
        .subscribe((product) => {
          this.product = product;
        });
    }
  }
}
