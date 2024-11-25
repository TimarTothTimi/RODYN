import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import {
  catchError,
  from,
  map,
  Observable,
  Subscription,
  throwError,
} from "rxjs";
import { AuthService } from "../../services/auth.service";
import { ProductService } from "../../services/product.service";
import { Router } from "@angular/router";
import { Product } from "../../models/product";
import { Firestore, doc, deleteDoc } from "@angular/fire/firestore";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() item!: Product;

  isAdmin: boolean = false;
  products: Product[] = [];
  private subDeleteProduct?: Subscription;
  private subProductRefresh?: Subscription;

  public loggedInStatus$?: Observable<boolean | null>;
  public isAdmin$?: Observable<boolean | null>;
  public userEmail$?: Observable<string | null>;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private router: Router,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    this.authService.currentUserRole.subscribe({
      next: (role) => {
        this.isAdmin = role === "admin";
      },
      error: (err: any) => console.error("Failed to fetch user role:", err),
    });

    this.refresh();
  }

  refresh(): void {
    this.subProductRefresh?.unsubscribe();

    this.subProductRefresh = this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
      },
      error: (err: any) => console.error("Failed to fetch products:", err),
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
    this.subDeleteProduct?.unsubscribe();
    this.subProductRefresh?.unsubscribe();
  }
}
