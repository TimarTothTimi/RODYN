import { Component } from "@angular/core";
import { ProductService } from "../../services/product.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent {
  productName: string = "";
  productPrice: number = 0;

  constructor(private productService: ProductService) {}

  addProduct(): void {
    if (!this.productName || this.productPrice <= 0) {
      console.error("Invalid product details.");
      return;
    }

    const newProduct = { name: this.productName, price: this.productPrice };
    this.productService.addProduct(newProduct).subscribe({
      next: (response) => {
        console.log("Product added:", response);

        this.productName = "";
        this.productPrice = 0;
      },
      error: (err) => {
        console.error("Failed to add product:", err);
      },
    });
  }
}
