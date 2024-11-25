import { AuthService } from "./../../services/auth.service";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../../models/product";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"],
})
export class ProductCardComponent {
  public isAdmin: boolean = false;
  products: Product[] = [];

  constructor(private authService: AuthService) {
    this.authService.currentUserRole.subscribe((role) => {
      this.isAdmin = role === "admin";
    });
  }

  @Input() product: any;
  @Output() deleteProduct = new EventEmitter<Product>();
}
