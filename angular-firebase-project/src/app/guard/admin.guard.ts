import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: unknown, state: unknown): Observable<boolean> {
    return this.authService.getAuthState().pipe(
      // itt használjuk a gettert
      switchMap((user) => {
        if (user) {
          return this.authService.getCurrentUserRole(user.uid).pipe(
            map((role) => {
              if (role === "admin") {
                return true;
              } else {
                this.router.navigate(["/"]);
                return false;
              }
            })
          );
        } else {
          this.router.navigate(["/login"]);
          return of(false);
        }
      })
    );
  }
}
