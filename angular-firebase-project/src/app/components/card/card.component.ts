import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  catchError,
  from,
  map,
  Observable,
  Subscription,
  throwError,
} from "rxjs";
import { AuthService } from "../../services/auth.service";
import { ProductService } from "../../product.service";
import { Router } from "@angular/router";
import { Product } from "../../models/product";
import { Firestore, doc, deleteDoc } from "@angular/fire/firestore";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  products: Product[] = [];
  private subDeleteProduct?: Subscription;
  private subProductRefresh?: Subscription;

  public loggedInStatus$?: Observable<boolean | null>;
  public isAdmin$?: Observable<boolean | null>;
  public userEmail$?: Observable<string | null>;

  taroloButorokCollestionRef: any;
  asztalokCollestionRef: any;
  barszekekCollestionRef: any;
  fotelekCollestionRef: any;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private router: Router,
    private firestore: Firestore
  ) {
    this.loggedInStatus$ = this.authService.loggedInStatus$;
    this.userEmail$ = this.authService.userEmail$;
  }

  ngOnInit(): void {
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

  deleteProduct(id: string, category: string): Observable<void> {
    const collectionRef =
      category === "szekek"
        ? this.barszekekCollestionRef
        : category === "fotelek"
        ? this.fotelekCollestionRef
        : category === "recepciosAsztalok"
        ? this.asztalokCollestionRef
        : category === "barszekek"
        ? this.barszekekCollestionRef
        : category === "asztalok"
        ? this.asztalokCollestionRef
        : category === "taroloButorok"
        ? this.taroloButorokCollestionRef
        : null;

    if (!collectionRef) {
      return throwError(() => new Error("Invalid product category"));
    }

    const productDocRef = doc(this.firestore, `${collectionRef.path}/${id}`);

    return from(deleteDoc(productDocRef)).pipe(
      map(() => void 0),
      catchError((err) => {
        console.error("Failed to delete product:", err);
        return throwError(() => err);
      })
    );
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
