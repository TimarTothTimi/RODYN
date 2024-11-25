import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-catalog",
  templateUrl: "./catalog.component.html",
  styleUrl: "./catalog.component.scss",
})
export class CatalogComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  subCurrentUserRole?: Subscription;

  public loggedInStatus$?: Observable<boolean | null>;
  public isAdmin$?: Observable<boolean | null>;
  public userEmail$?: Observable<string | null>;

  constructor(private authService: AuthService) {
    this.loggedInStatus$ = this.authService.loggedInStatus$;
    this.userEmail$ = this.authService.userEmail$;
  }

  ngOnInit(): void {
    this.authService.currentUserRole.subscribe((role) => {
      this.isAdmin = role === "admin";
    });
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }
  ngOnDestroy(): void {
    this.subCurrentUserRole?.unsubscribe();
  }
}
