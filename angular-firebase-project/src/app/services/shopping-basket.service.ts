import { Injectable } from "@angular/core";
import { BasketItem } from "../models/basketItem";

@Injectable({
  providedIn: "root",
})
export class ShoppingBasketService {
  getBasket(): BasketItem[] {
    return JSON.parse(localStorage.getItem("shoppingBasket") || "[]");
  }

  setBasketItem(id: string, category: string, quantity: number): void {
    const basketItem = {
      id,
      category,
      quantity,
    };
    const shoppingBasket = this.getBasket();
    const itemIndex = shoppingBasket.findIndex((p: any) => p.id === id);
    if (itemIndex === -1) {
      shoppingBasket.push(basketItem);
    } else {
      shoppingBasket[itemIndex].quantity = quantity;
    }
    localStorage.setItem("shoppingBasket", JSON.stringify(shoppingBasket));
  }

  deleteBasketItem(id: string): void {
    const shoppingBasket = this.getBasket();
    const productIndex = shoppingBasket.findIndex((p: any) => p.id === id);
    if (productIndex === -1) {
      return;
    }
    shoppingBasket.splice(productIndex, 1);
    localStorage.setItem("shoppingBasket", JSON.stringify(shoppingBasket));
  }
}
