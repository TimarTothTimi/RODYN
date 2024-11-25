import { AuthService } from "./../../services/auth.service";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../../models/product";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"],
})
export class ProductCardComponent implements OnInit {
  public isAdmin: boolean = false;
  public loggedInStatus$?: Observable<boolean | null>;
  public userEmail$?: Observable<string | null>;

  products: Product[] = [];

  // constructor(private authService: AuthService) {
  //   this.authService.currentUserRole.subscribe((role) => {
  //     this.isAdmin = role === "admin";
  //   });
  // }
  constructor(private authService: AuthService) {
    this.loggedInStatus$ = this.authService.loggedInStatus$;
    this.userEmail$ = this.authService.userEmail$;
  }

  @Input() product: any;
  @Output() deleteProduct = new EventEmitter<Product>();

  ngOnInit(): void {
    this.authService.currentUserRole.subscribe((role) => {
      this.isAdmin = role === "admin";
    });
  }
}
