import { Component, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { UserCredential } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-customer-reg",
  templateUrl: "./customer-reg.component.html",
  styleUrls: ["./customer-reg.component.scss"],
})
export class CustomerRegComponent implements OnDestroy {
  destroy$: Subject<void> = new Subject<void>();

  customerRegForm: FormGroup = new FormGroup({
    firstName: new FormControl("", [
      Validators.required,
      Validators.pattern(
        "^[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+( [A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+){0,2}$"
      ),
    ]),
    lastName: new FormControl("", [
      Validators.required,
      Validators.pattern(
        "^[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+( [A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+){0,2}$"
      ),
    ]),
    address: new FormControl("", [Validators.required]),
    city: new FormControl("", [
      Validators.required,
      Validators.pattern("^[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+$"),
      Validators.minLength(2),
    ]),
    country: new FormControl("", [
      Validators.required,
      Validators.pattern("^[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+$"),
      Validators.minLength(2),
    ]),
    mobile: new FormControl(""),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  get firstName() {
    return this.customerRegForm.get("firstName");
  }
  get lastName() {
    return this.customerRegForm.get("lastName");
  }

  get address() {
    return this.customerRegForm.get("address");
  }

  get city() {
    return this.customerRegForm.get("city");
  }

  get country() {
    return this.customerRegForm.get("country");
  }
  get mobile() {
    return this.customerRegForm.get("mobile");
  }
  get email() {
    return this.customerRegForm.get("email");
  }
  get password() {
    return this.customerRegForm.get("password");
  }

  constructor(private router: Router, private authService: AuthService) {}

  submitRegForm(): void {
    if (!this.customerRegForm.invalid) {
      this.authService
        .registration(this.customerRegForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (userCredential: UserCredential) => {
            console.log("Customer saved with ID:", userCredential.user.email);
            this.customerRegForm.reset();
            this.router.navigate([""]);
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
