import { Component, OnDestroy, OnInit } from "@angular/core";
import { ProductService } from "../services/product.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { combineLatest, map, Subscription } from "rxjs";
import { Product } from "../models/product";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrl: "./product-form.component.scss",
})
export class ProductFormComponent implements OnInit, OnDestroy {
  public product?: Product;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  productForm!: FormGroup;
  subSaveProduct?: Subscription;
  subRoute?: Subscription;

  ngOnInit(): void {
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
    this.subRoute = this.activatedRoute.paramMap.subscribe({
      next: (params: ParamMap) => {
        let productId = params.get("id"); // Lekérjük az ID-t az URL-ből
        const szekek$ = this.productService.getSzekek();
        const fotelek$ = this.productService.getFotelek();
        const recepciosAsztalok$ = this.productService.getRecepciosAsztalok();
        const barszekek$ = this.productService.getBarszekek();
        const asztalok$ = this.productService.getAsztalok();
        const taroloButorok$ = this.productService.getTaroloButorok();
        combineLatest([
          szekek$,
          fotelek$,
          recepciosAsztalok$,
          barszekek$,
          asztalok$,
          taroloButorok$,
        ])
          .pipe(
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
              ]) => [
                ...szekek,
                ...fotelek,
                ...recepciosAsztalok,
                ...barszekek,
                ...asztalok,
                ...taroloButorok,
              ]
            ),
            map((products) =>
              products.find((product) => product.id === productId)
            )
          )
          .subscribe((product) => {
            if (product != undefined) {
              this.productForm.patchValue(product);
              this.product = product;
            }
          });
      },
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
      if (this.product?.id) {
        product.id = this.product?.id;
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
              this.router.navigate([""]);
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
              // this.productForm.reset();
              this.router.navigate([""]);
              //nem kell a reset ha elnavigálok
            },
          });
      }
    }
  }

  ngOnDestroy(): void {
    this.subSaveProduct?.unsubscribe();
    this.subRoute?.unsubscribe();
  }
}
