import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../product.service";
import { Szekek } from "../../models/szekek.model";
@Component({
  selector: "app-szekek",
  templateUrl: "./szekek.component.html",
  styleUrls: ["./szekek.component.css"],
})
export class SzekekComponent implements OnInit {
  szekek: Szekek[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getSzekek().subscribe((response: Szekek[]) => {
      this.szekek = response;
    });
  }
}
