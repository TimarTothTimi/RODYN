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
    standalone: false
})
export class ProductCardComponent implements OnInit, OnDestroy {
  public isAdmin: boolean = false;
  public loggedInStatus$?: Observable<boolean | null>;
  public userEmail$?: Observable<string | null>;
  destroy$: Subject<void> = new Subject<void>();

  products: Product[] = [];

  constructor(private authService: AuthService) {
    this.loggedInStatus$ = this.authService.loggedInStatus$;
    this.userEmail$ = this.authService.userEmail$;
  }

  @Input() product: any;
  @Output() deleteProduct = new EventEmitter<Product>();

  ngOnInit(): void {
    this.authService.currentUserRole
      .pipe(takeUntil(this.destroy$))
      .subscribe((role) => {
        this.isAdmin = role === "admin";
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
