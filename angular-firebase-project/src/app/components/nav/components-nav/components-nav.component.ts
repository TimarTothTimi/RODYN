import { Component, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, Subject, takeUntil } from "rxjs";
import { AuthService } from "../../../services/auth.service";
import { ShoppingBasketService } from "../../../services/shopping-basket.service";
import { ProductService } from "../../../services/product.service";
import { Product } from "../../../models/product";

@Component({
    selector: "app-components-nav",
    templateUrl: "./components-nav.component.html",
    styleUrls: ["./components-nav.component.scss"],
    standalone: false
})
export class ArticlesNavComponent implements OnInit, OnDestroy {
  logout() {
    throw new Error("Method not implemented.");
  }
  isSearchOverlayVisible: boolean = false;
  searchQuery: string = "";
  searchResults: Product[] = [];

  destroy$: Subject<void> = new Subject<void>();
  isAdmin: boolean = false;
  basketItemCount: number = 0;

  public loggedInStatus$ = new BehaviorSubject<boolean>(false);

  constructor(
    private authService: AuthService,
    private shoppingBasketService: ShoppingBasketService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.authService.currentUserRole.pipe(takeUntil(this.destroy$)).subscribe({
      next: (role) => {
        this.loggedInStatus$.next(role !== null);
        this.isAdmin = role === "admin";
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSearchOverlay(event: Event): void {
    event.preventDefault();
    this.isSearchOverlayVisible = !this.isSearchOverlayVisible;
  }

  onSearch(): void {
    if (this.searchQuery.trim() === "") {
      this.searchResults = [];
      return;
    }

    this.productService.searchProducts(this.searchQuery).subscribe({
      next: (products: Product[]) => {
        this.searchResults = products;
      },
      error: (err: any) => {
        console.error("Failed to fetch search results:", err);
      },
    });
  }
}
