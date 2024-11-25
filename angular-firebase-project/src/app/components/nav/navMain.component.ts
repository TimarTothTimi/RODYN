import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { BehaviorSubject, map, Observable, Subscription, tap } from "rxjs";

@Component({
  selector: "app-nav",
  templateUrl: "./navMain.component.html",
  styleUrls: ["./navMain.component.scss"],
})
export class NavComponent implements OnDestroy {
  isAdmin: boolean = false;
  subCurrentUserRole?: Subscription;

  public loggedInStatus$ = new BehaviorSubject<boolean>(false);
  public isAdmin$?: Observable<boolean | null>;
  public userEmail$?: Observable<string | null>;

  constructor(private authService: AuthService) {
    this.authService.currentUserRole.subscribe({
      next: (role) => {
        console.log("nav role", role);
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
