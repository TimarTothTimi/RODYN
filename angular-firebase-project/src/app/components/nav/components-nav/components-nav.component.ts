import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-components-nav",
  templateUrl: "./components-nav.component.html",
  styleUrl: "./components-nav.component.scss",
})
export class ArticlesNavComponent {
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
