import { Component, OnDestroy, OnInit } from "@angular/core";
import { ProductService } from "../services/product.service";
import { ActivatedRoute, ParamMap, Router, UrlSegment } from "@angular/router";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { combineLatest, first, map, Subscription } from "rxjs";
import { Product } from "../models/product";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrl: "./product-form.component.scss",
})
export class ProductFormComponent implements OnInit, OnDestroy {
  productForm: FormGroup;
  subSaveProduct?: Subscription;
  subRoute?: Subscription;
  subDeleteProduct?: Subscription;
  id: string | null;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.productForm = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      price: new FormControl(null, [Validators.required]),
      manufacturer: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      category: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      images: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.subRoute = combineLatest([
      this.productService.getSzekek(),
      this.productService.getFotelek(),
      this.productService.getRecepciosAsztalok(),
      this.productService.getBarszekek(),
      this.productService.getAsztalok(),
      this.productService.getTaroloButorok(),
    ])
      .pipe(
        first(),
        map(
          ([
            szekek,
            fotelek,
            recepciosAsztalok,
            barszekek,
            asztalok,
            taroloButorok,
          ]: [
            Product[],
            Product[],
            Product[],
            Product[],
            Product[],
            Product[]
          ]) => {
            return [
              ...szekek,
              ...fotelek,
              ...recepciosAsztalok,
              ...barszekek,
              ...asztalok,
              ...taroloButorok,
            ].find((product) => product.id === this.id);
          }
        )
      )
      .subscribe((product) => {
        if (product != undefined) {
          this.productForm.patchValue(product);
        }
      });
  }

  get name(): AbstractControl | null {
    return this.productForm.get("name");
  }
  get price(): AbstractControl | null {
    return this.productForm.get("price");
  }
  get manufacturer(): AbstractControl | null {
    return this.productForm.get("manufacturer");
  }
  get category(): AbstractControl | null {
    return this.productForm.get("category");
  }
  get description(): AbstractControl | null {
    return this.productForm.get("description");
  }
  get images(): AbstractControl | null {
    return this.productForm.get("images");
  }

  createOrUpdateProduct(): void {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      if (this.id !== null) {
        product.id = this.id;
        this.subSaveProduct = this.productService
          .updateProduct(product)
          .subscribe({
            next: () => {
              console.log("Product updated!");
            },
            error: (err) => {
              console.log(err);
            },
            complete: () => {
              this.router.navigate(["/", product.category]);
            },
          });
      } else {
        this.subSaveProduct = this.productService
          .creatProduct(product)
          .subscribe({
            next: () => {
              console.log("Product created!");
            },
            error: (err) => {
              console.log(err);
            },
            complete: () => {
              console.log(product);
              this.router.navigate(["/", product.category]);
            },
          });
      }
    }
  }

  deleteProduct(id: string, category: string): void {
    this.subDeleteProduct = this.productService
      .deleteProduct(id, category)
      .subscribe({
        next: () => {
          console.log("Product deleted!");
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.router.navigate(["/", category]);
        },
      });
  }

  ngOnDestroy(): void {
    this.subSaveProduct?.unsubscribe();
    this.subRoute?.unsubscribe();
    this.subDeleteProduct?.unsubscribe();
  }
}
