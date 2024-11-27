import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductListComponent } from "./product-list.component";
import { ProductCardComponent } from "../product-card/product-card.component"; // Import the ProductCardComponent

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"],
})
export class ProductCardComponent {
  @Input() product: any; // Add the Input property for product
}
