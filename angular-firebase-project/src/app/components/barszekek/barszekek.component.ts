import { Component, OnDestroy, OnInit } from "@angular/core";
import { Product } from "../../models/product";
import { Observable, Subscription } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { ProductService } from "../../services/product.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-barszekek",
  templateUrl: "./barszekek.component.html",
  styleUrl: "./barszekek.component.scss",
})
export class BarszekekComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  products: Product[] = [];
  subDeleteProduct?: Subscription;

  public loggedInStatus$?: Observable<boolean | null>;
  public isAdmin$?: Observable<boolean | null>;
  public userEmail$?: Observable<string | null>;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUserRole.subscribe((role) => {
      this.isAdmin = role === "admin";
    });
    this.refresh();
  }

  refresh(): void {
    this.productService.getBarszekek().subscribe((products) => {
      this.products = products;
    });
  }

  deleteProduct(id: string, category: string): void {
    this.subDeleteProduct = this.productService
      .deleteProduct(id, category)
      .subscribe({
        next: () => {
          console.log("Product deleted!");
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.router.navigate(["/", category]);
          this.refresh();
        },
      });
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subDeleteProduct?.unsubscribe();
  }
}
