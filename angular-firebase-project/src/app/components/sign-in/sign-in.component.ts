import { Component, OnDestroy } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"],
})
export class SignInComponent implements OnDestroy {
  destroy$: Subject<void> = new Subject<void>();

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  });

  get email(): AbstractControl | null {
    return this.loginForm.get("email");
  }

  get password(): AbstractControl | null {
    return this.loginForm.get("password");
  }

  constructor(private authService: AuthService) {}

  public login() {
    this.authService
      .login(this.loginForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  public loginWithGoogle() {
    this.authService.loginWithGoogle();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
