import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subject, Subscription, takeUntil } from "rxjs";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: "app-catalog",
    templateUrl: "./catalog.component.html",
    styleUrl: "./catalog.component.scss",
    standalone: false
})
export class CatalogComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  subCurrentUserRole?: Subscription;
  destroy$: Subject<void> = new Subject<void>();

  public loggedInStatus$?: Observable<boolean | null>;
  public isAdmin$?: Observable<boolean | null>;
  public userEmail$?: Observable<string | null>;

  constructor(private authService: AuthService) {
    this.loggedInStatus$ = this.authService.loggedInStatus$;
    this.userEmail$ = this.authService.userEmail$;
  }

  ngOnInit(): void {
    this.authService.currentUserRole
      .pipe(takeUntil(this.destroy$))
      .subscribe((role) => {
        this.isAdmin = role === "admin";
      });
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
