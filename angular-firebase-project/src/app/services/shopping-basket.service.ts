import { Injectable } from "@angular/core";
import { BasketItem } from "../models/basketItem";
import { Product } from "../models/product";

@Injectable({
  providedIn: "root",
})
export class ShoppingBasketService {
  getBasket(): BasketItem[] {
    return JSON.parse(localStorage.getItem("shoppingBasket") || "[]");
  }

  setBasketItem(product: Product, quantity: number): void {
    const basketItem: BasketItem = {
      id: product.id!,
      category: product.category,
      quantity: quantity,
      images: product.images,
      manufacturer: product.manufacturer,
      price: product.price,
      name: product.name,
      description: product.description,
    };
    const shoppingBasket = this.getBasket();
    const itemIndex = shoppingBasket.findIndex((p: any) => p.id === product.id);
    if (itemIndex === -1) {
      shoppingBasket.push(basketItem);
    } else {
      shoppingBasket[itemIndex].quantity = quantity;
    }
    localStorage.setItem("shoppingBasket", JSON.stringify(shoppingBasket));
  }

  setQuantity(id: string, quantity: number): void {
    const shoppingBasket = this.getBasket();
    const productIndex = shoppingBasket.findIndex((p: any) => p.id === id);
    if (productIndex === -1) {
      return;
    }
    shoppingBasket[productIndex].quantity = quantity;
    localStorage.setItem("shoppingBasket", JSON.stringify(shoppingBasket));
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
