import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CustomerService } from "../../services/customer.service";
import { CustomerModel } from "../../models/customer.model";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { UserCredential } from "@angular/fire/auth";

@Component({
  selector: "app-customer-reg",
  templateUrl: "./customer-reg.component.html",
  styleUrls: ["./customer-reg.component.scss"],
})
export class CustomerRegComponent {
  customerRegForm: FormGroup = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    address: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
    mobile: new FormControl(""),
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
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

  submitRegForm() {
    if (!this.customerRegForm.invalid) {
      this.authService.registration(this.customerRegForm.value).subscribe({
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
}
