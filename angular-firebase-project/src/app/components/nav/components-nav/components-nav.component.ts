import { Component, OnDestroy } from "@angular/core";
import { BehaviorSubject, map, Observable, Subscription, tap } from "rxjs";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-components-nav",
  templateUrl: "./components-nav.component.html",
  styleUrl: "./components-nav.component.scss",
})
export class ArticlesNavComponent implements OnDestroy {
  isAdmin: boolean = false;

  subCurrentUserRole?: Subscription;

  public loggedInStatus$ = new BehaviorSubject<boolean>(false);
  public isAdmin$?: Observable<boolean | null>;
  public userEmail$?: Observable<string | null>;

  constructor(private authService: AuthService) {
    this.subCurrentUserRole = this.authService.currentUserRole.subscribe({
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

  ngOnDestroy(): void {
    this.subCurrentUserRole?.unsubscribe();
  }
}
