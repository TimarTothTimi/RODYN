import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-articles-nav",
  templateUrl: "./articles-nav.component.html",
  styleUrl: "./articles-nav.component.scss",
})
export class ArticlesNavComponent {
  public loggedInStatus$?: Observable<boolean | null>;
  public userEmail$?: Observable<string | null>;

  constructor(private authService: AuthService) {
    this.loggedInStatus$ = this.authService.loggedInStatus$;
    this.userEmail$ = this.authService.userEmail$;
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }
}
