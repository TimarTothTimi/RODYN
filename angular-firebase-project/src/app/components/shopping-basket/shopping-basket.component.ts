import { BasketItem } from "../../models/basketItem";
import { ShoppingBasketService } from "./../../services/shopping-basket.service";
import { Component } from "@angular/core";

@Component({
  selector: "app-shopping-basket",
  templateUrl: "./shopping-basket.component.html",
  styleUrl: "./shopping-basket.component.scss",
})
export class ShoppingBasketComponent {
  items: BasketItem[];
  constructor(private shoppingBasketService: ShoppingBasketService) {
    this.items = this.shoppingBasketService.getBasket();
  }
  increaseQuantity(id: string, category: string): void {
    // this.quantity++;
  }
  decreaseQuantity(id: string, category: string): void {
    // if (this.quantity > 1) {
    //   this.quantity--;
    // }
  }
}
