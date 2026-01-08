import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { BehaviorSubject, Observable, Subject, takeUntil } from "rxjs";
import { ShoppingBasketService } from "../../services/shopping-basket.service";

@Component({
    selector: "app-nav",
    templateUrl: "./navMain.component.html",
    styleUrls: ["./navMain.component.scss"],
    standalone: false
})
export class NavComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  destroy$: Subject<void> = new Subject<void>();
  basketItemCount: number = 0;

  public loggedInStatus$ = new BehaviorSubject<boolean>(false);
  public isAdmin$?: Observable<boolean | null>;
  public userEmail$?: Observable<string | null>;

  constructor(
    private authService: AuthService,
    private shoppingBasketService: ShoppingBasketService
  ) {
    this.authService.currentUserRole.pipe(takeUntil(this.destroy$)).subscribe({
      next: (role) => {
        this.loggedInStatus$.next(role !== null);
        this.isAdmin = role === "admin";
      },
    });
    this.userEmail$ = this.authService.userEmail$;
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }

  ngOnInit(): void {
    this.shoppingBasketService
      .getBasketItemCount()
      .pipe(takeUntil(this.destroy$))
      .subscribe((count) => {
        this.basketItemCount = count;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
