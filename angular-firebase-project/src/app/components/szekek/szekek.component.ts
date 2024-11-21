import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { Observable } from "rxjs";
import { Product } from "../../models/product";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-szekek",
  templateUrl: "./szekek.component.html",
  styleUrls: ["./szekek.component.scss"],
})
export class SzekekComponent implements OnInit {
  szekek: Szekek[] = [];

  constructor(private productService: ProductService) {}

  // constructor(private productService: ProductService) {}
  // szekek$?: Observable<Product[]>;

  // ngOnInit(): void {
  //   this.szekek$ = this.productService.getSzekek();
  // }

  isAdmin: boolean = false;
  products: Product[] = [];

  public loggedInStatus$?: Observable<boolean | null>;
  public isAdmin$?: Observable<boolean | null>;
  public userEmail$?: Observable<string | null>;

  constructor(
    private authService: AuthService,
    private productService: ProductService
  ) {
    this.loggedInStatus$ = this.authService.loggedInStatus$;
    this.userEmail$ = this.authService.userEmail$;
  }

  ngOnInit(): void {
    this.productService.getSzekek().subscribe((response: Szekek[]) => {
      this.szekek = response;
    });
    this.authService.currentUserRole.subscribe((role) => {
      this.isAdmin = role === "admin";
    });
    this.productService.getProducts("szekek").subscribe((products) => {
      this.products = products;
    });
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }
}
