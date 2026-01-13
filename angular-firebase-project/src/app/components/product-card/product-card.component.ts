import { AuthService } from "./../../services/auth.service";
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { Observable, Subject, takeUntil } from "rxjs";
import { Product } from "../../models/product";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"],
  standalone: false,
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() product!: Product; // ⚡ Input típushelyesen
  @Output() deleteProduct = new EventEmitter<Product>(); // ⚡ Output típushelyesen

  public isAdmin: boolean = false;
  public loggedInStatus$: Observable<boolean | null>;
  public userEmail$: Observable<string | null>;

  private destroy$ = new Subject<void>();

  constructor(private authService: AuthService) {
    // ⚡ Observable-ok inicializálása a konstruktorban
    this.loggedInStatus$ = this.authService.loggedInStatus$;
    this.userEmail$ = this.authService.userEmail$;
  }

  ngOnInit(): void {
    // ⚡ Admin státusz figyelése
    this.authService.currentUserRole
      .pipe(takeUntil(this.destroy$))
      .subscribe((role) => {
        this.isAdmin = role === "admin";
      });
  }

  // ⚡ Törlés gomb esemény kezelése
  onDelete(): void {
    this.deleteProduct.emit(this.product);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
