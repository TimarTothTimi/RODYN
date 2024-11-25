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

  // Alapértelmezett @Input() értékek
  @Input() title: string = "Alapértelmezett cím"; // Alapértelmezett cím
  @Input() description: string = "Alapértelmezett leírás"; // Alapértelmezett leírás
  @Input() imageUrl: string | null = null; // Opcionális kép URL

  private _loggedInStatus$?: Observable<boolean | null>;
  public get loggedInStatus$(): Observable<boolean | null> | undefined {
    return this._loggedInStatus$;
  }
  public set loggedInStatus$(value: Observable<boolean | null> | undefined) {
    this._loggedInStatus$ = value;
  }

  public isAdmin$?: Observable<boolean | null>;
  public userEmail$?: Observable<string | null>;

  // Firestore collection referenciák
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
    // Admin szerep beállítása
    this.authService.currentUserRole.subscribe({
      next: (role) => {
        this.isAdmin = role === "admin";
      },
      error: (err) => console.error("Failed to fetch user role:", err),
    });

    this.refresh(); // Termékek betöltése
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

  // Törlés metódus
  deleteProduct(id: string, category: string): Observable<void> {
    let collectionRef;

    // Kategória alapján beállítjuk a megfelelő Firestore gyűjteményt
    switch (category) {
      case "szekek":
        collectionRef = this.barszekekCollestionRef;
        break;
      case "fotelek":
        collectionRef = this.fotelekCollestionRef;
        break;
      case "recepciosAsztalok":
        collectionRef = this.asztalokCollestionRef;
        break;
      case "barszekek":
        collectionRef = this.barszekekCollestionRef;
        break;
      case "asztalok":
        collectionRef = this.asztalokCollestionRef;
        break;
      case "taroloButorok":
        collectionRef = this.taroloButorokCollestionRef;
        break;
      default:
        return throwError(() => new Error("Invalid product category"));
    }

    // Ha nincs megfelelő gyűjtemény, hiba
    if (!collectionRef) {
      return throwError(() => new Error("Invalid product category"));
    }

    // Firestore dokumentum referencia létrehozása
    const productDocRef = doc(this.firestore, `${collectionRef.path}/${id}`);

    // Törlés végrehajtása
    return from(deleteDoc(productDocRef)).pipe(
      map(() => void 0), // Visszaadjuk a void típusú eredményt
      catchError((err) => {
        console.error("Failed to delete product:", err);
        return throwError(() => err); // Hibát továbbítjuk
      })
    );
  }

  // Kijelentkezés metódus
  async logout(): Promise<void> {
    try {
      await this.authService.logout();
      console.log("Successfully logged out");
    } catch (err) {
      console.error("Failed to log out:", err);
    }
  }

  ngOnDestroy(): void {
    // Előfizetések leiratkozása
    this.subDeleteProduct?.unsubscribe();
    this.subProductRefresh?.unsubscribe();
  }
}
