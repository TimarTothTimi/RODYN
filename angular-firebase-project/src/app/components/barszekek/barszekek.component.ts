import { Component, OnDestroy, OnInit } from "@angular/core";
import { Product } from "../../models/product";
import { Observable, Subscription } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { ProductService } from "../../services/product.service";
import { Router } from "@angular/router";
import { ShoppingBasketService } from "../../services/shopping-basket.service";

@Component({
  selector: "app-barszekek",
  templateUrl: "./barszekek.component.html",
  styleUrl: "./barszekek.component.scss",
})
export class BarszekekComponent implements OnInit {
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
    this.productService.getBarszekek().subscribe((products) => {
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
      console.log(role);

      this.isAdmin = role === "admin";
    });
  }
  // isAdmin: boolean = false;
  // products: Product[] = [];
  // subDeleteProduct?: Subscription;
  // public loggedInStatus$?: Observable<boolean | null>;
  // public isAdmin$?: Observable<boolean | null>;
  // public userEmail$?: Observable<string | null>;
  // constructor(
  //   private authService: AuthService,
  //   private productService: ProductService,
  //   private router: Router
  // ) {
  //   this.loggedInStatus$ = this.authService.loggedInStatus$;
  //   this.userEmail$ = this.authService.userEmail$;
  // }
  // ngOnInit(): void {
  //   this.authService.currentUserRole.subscribe((role) => {
  //     this.isAdmin = role === "admin";
  //   });
  //   this.refresh();
  // }
  // refresh(): void {
  //   this.productService.getBarszekek().subscribe((products) => {
  //     this.products = products;
  //   });
  // }
  // deleteProduct(id: string, category: string): void {
  //   this.subDeleteProduct = this.productService
  //     .deleteProduct(id, category)
  //     .subscribe({
  //       next: () => {
  //         console.log("Product deleted!");
  //       },
  //       error: (err) => {
  //         console.log(err);
  //       },
  //       complete: () => {
  //         this.router.navigate(["/", category]);
  //         this.refresh();
  //       },
  //     });
  // }
  // async logout(): Promise<void> {
  //   await this.authService.logout();
  // }
  // ngOnDestroy(): void {
  //   this.subDeleteProduct?.unsubscribe();
  // }
}
