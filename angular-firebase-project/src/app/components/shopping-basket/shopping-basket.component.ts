import { combineLatest, Observable, Subject, takeUntil } from "rxjs";
import { BasketItem } from "../../models/basketItem";
import { Product } from "../../models/product";
import { ShoppingBasketService } from "./../../services/shopping-basket.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-shopping-basket",
    templateUrl: "./shopping-basket.component.html",
    styleUrl: "./shopping-basket.component.scss",
    standalone: false
})
export class ShoppingBasketComponent implements OnInit, OnDestroy {
  items: BasketItem[];
  relatedProducts: Product[] = [];
  destroy$: Subject<void> = new Subject<void>();
  public product?: Product;
  totalSum: number = 0;

  constructor(
    private shoppingBasketService: ShoppingBasketService,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.items = this.shoppingBasketService.getBasket();
    this.sumBasket();
  }

  basketForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl("", [Validators.required]),
    FormControlTextarea: new FormControl(""),
  });

  get name() {
    return this.basketForm.get("name");
  }
  get email() {
    return this.basketForm.get("email");
  }

  get phone() {
    return this.basketForm.get("phone");
  }
  get FormControlTextarea() {
    return this.basketForm.get("FormControlTextarea");
  }

  submitForm(): void {
    if (this.basketForm.valid) {
      const confirmed = confirm(
        "Köszönjük a megrendelését! 1-2 munkanapon belül felvesszük Önnel a kapcsolatot!"
      );
      // if (confirmed) {
      //   console.log("Megrendelés elküldve:", this.basketForm.value);
      // }
    }
  }

  ngOnInit(): void {
    this.items = this.shoppingBasketService.getBasket();
    this.loadRelatedProducts();
  }

  loadRelatedProducts(): void {
    const categories = this.items.map((item) => item.category);
    const distinctCategories = [...new Set(categories)];
    const productObservables = distinctCategories.reduce((acc, category) => {
      acc.push(this.productService.getProducts(category));
      return acc;
    }, new Array<Observable<Product[]>>());
    combineLatest(productObservables)
      .pipe(takeUntil(this.destroy$))
      .subscribe((productArrays: Product[][]) => {
        const products = productArrays
          .flat()
          .filter(
            (product) => !this.items.some((item) => item.id === product.id)
          );
        for (let i = 0; i < 2; i++) {
          const randomIndex = Math.floor(Math.random() * products.length);
          this.relatedProducts.push(products[randomIndex]);
        }
      });
  }

  increaseQuantity(id: string): void {
    const item = this.items.find((item) => item.id === id);
    if (item) {
      item.quantity++;
      this.shoppingBasketService.setQuantity(item.id, item.quantity);
      this.sumBasket();
    }
  }
  decreaseQuantity(id: string): void {
    const item = this.items.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      item.quantity--;
      this.shoppingBasketService.setQuantity(item.id, item.quantity);
      this.sumBasket();
    }
  }

  deleteBasketItem(id: string, category: string): void {
    this.shoppingBasketService.deleteBasketItem(id);
    this.items = this.shoppingBasketService.getBasket();
    this.sumBasket();
  }

  sumBasket(): void {
    this.totalSum = this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
