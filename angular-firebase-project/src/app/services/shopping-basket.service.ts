import { Injectable } from "@angular/core";
import { BasketItem } from "../models/basketItem";
import { Product } from "../models/product";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ShoppingBasketService {
  private basket: BasketItem[] = [];
  private basketItemCount = new BehaviorSubject<number>(0);

  constructor() {
    this.updateBasketItemCount();
  }

  getBasket(): BasketItem[] {
    return JSON.parse(localStorage.getItem("shoppingBasket") || "[]");
  }

  // getBasketItemCount(): number {
  //   const shoppingBasket = this.getBasket();

  //   return shoppingBasket.reduce((count, item) => count + item.quantity, 0);
  // }

  getBasketItemCount(): BehaviorSubject<number> {
    return this.basketItemCount;
  }

  private updateBasketItemCount(): void {
    const shoppingBasket = this.getBasket();
    const itemCount = shoppingBasket.reduce(
      (count, item) => count + item.quantity,
      0
    );
    this.basketItemCount.next(itemCount);
  }

  setQuantity(id: string, quantity: number): void {
    const shoppingBasket = this.getBasket();
    const productIndex = shoppingBasket.findIndex((p: any) => p.id === id);
    if (productIndex === -1) {
      return;
    }
    shoppingBasket[productIndex].quantity = quantity;
    localStorage.setItem("shoppingBasket", JSON.stringify(shoppingBasket));
    this.updateBasketItemCount();
  }

  addToBasket(product: Product): void {
    const shoppingBasket = this.getBasket();
    const productIndex = shoppingBasket.findIndex(
      (p: any) => p.id === product.id
    );
    if (productIndex === -1) {
      shoppingBasket.push({ ...product, id: product.id!, quantity: 1 });
    } else {
      shoppingBasket[productIndex].quantity++;
    }
    localStorage.setItem("shoppingBasket", JSON.stringify(shoppingBasket));
    this.updateBasketItemCount();
  }

  deleteBasketItem(id: string): void {
    const shoppingBasket = this.getBasket();
    const productIndex = shoppingBasket.findIndex((p: any) => p.id === id);
    if (productIndex === -1) {
      return;
    }
    shoppingBasket.splice(productIndex, 1);
    localStorage.setItem("shoppingBasket", JSON.stringify(shoppingBasket));
    this.updateBasketItemCount();
  }
}
