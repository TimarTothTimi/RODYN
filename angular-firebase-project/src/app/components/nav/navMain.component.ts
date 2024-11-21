import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-nav",
  templateUrl: "./navMain.component.html",
  styleUrls: ["./navMain.component.scss"],
})
export class NavComponent implements OnInit {
  isAdmin: boolean = false;

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
}
