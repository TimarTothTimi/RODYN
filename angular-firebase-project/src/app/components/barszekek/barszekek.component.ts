import { Component, OnInit } from "@angular/core";
import { Product } from "../../models/product";
import { Observable } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { ProductService } from "../../services/product.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-barszekek",
  templateUrl: "./barszekek.component.html",
  styleUrl: "./barszekek.component.scss",
})
export class BarszekekComponent implements OnInit {
  isAdmin: boolean = false;
  products: Product[] = [];

  public loggedInStatus$?: Observable<boolean | null>;
  public isAdmin$?: Observable<boolean | null>;
  public userEmail$?: Observable<string | null>;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private router: Router
  ) {
    this.loggedInStatus$ = this.authService.loggedInStatus$;
    this.userEmail$ = this.authService.userEmail$;
  }

  ngOnInit(): void {
    this.authService.currentUserRole.subscribe((role) => {
      this.isAdmin = role === "admin";
    });
    this.productService.getProducts("barszekek").subscribe((products) => {
      this.products = products;
    });
  }

  //UPDATE
  updateProduct(product: Product): void {
    this.router.navigate(["/barszekek", product.id]); // Navigáció a regisztrációs oldalra a telefon ID-jével
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }
}
