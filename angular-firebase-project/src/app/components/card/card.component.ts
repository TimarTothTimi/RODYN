import { Component, OnInit, OnDestroy } from "@angular/core"; // OnInit és OnDestroy importálva
import { Observable, Subscription } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { ProductService } from "../../product.service";
import { Router } from "@angular/router";
import { Product } from "../../models/product";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"], // Javított kulcs: styleUrl -> styleUrls
})
export class CardComponent implements OnInit, OnDestroy {
  // OnInit és OnDestroy implementálva
  isAdmin: boolean = false;
  products: Product[] = [];
  private subDeleteProduct?: Subscription; // private jelölve, belső használat
  private subProductRefresh?: Subscription; // Termékfrissítéshez külön subscription

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
    // Az OnInit interfész metódusa
    this.authService.currentUserRole.subscribe({
      next: (role) => {
        this.isAdmin = role === "admin";
      },
      error: (err) => console.error("Failed to fetch user role:", err),
    });

    this.refresh();
  }

  refresh(): void {
    this.subProductRefresh?.unsubscribe();

    this.subProductRefresh = this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
      },
      error: (err) => console.error("Failed to fetch products:", err),
    });
  }

  deleteProduct(id: string, category: string): void {
    this.subDeleteProduct?.unsubscribe();

    this.subDeleteProduct = this.productService
      .deleteProduct(id, category)
      .subscribe({
        next: () => {
          console.log("Product deleted!");
          this.refresh();
        },
        error: (err: any) => console.error("Failed to delete product:", err),
        complete: () => {
          this.router.navigate(["/", category]);
        },
      });
  }

  async logout(): Promise<void> {
    try {
      await this.authService.logout();
      console.log("Successfully logged out");
    } catch (err) {
      console.error("Failed to log out:", err);
    }
  }

  ngOnDestroy(): void {
    // Az OnDestroy interfész metódusa
    this.subDeleteProduct?.unsubscribe();
    this.subProductRefresh?.unsubscribe();
  }
}
