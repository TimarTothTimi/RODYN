import { Component } from "@angular/core";
import { ProductService } from "../../services/product.service";

@Component({
    selector: "app-admin",
    templateUrl: "./admin.component.html",
    styleUrls: ["./admin.component.scss"],
    standalone: false
})
export class AdminComponent {
  // productName: string = "";
  // productPrice: number = 0;
  // isAdmin$!: Observable<boolean>;
  // constructor(
  //   private productService: ProductService,
  //   private authService: AuthService
  // ) {}
  // addProduct() {
  //   const newProduct = { name: this.productName, price: this.productPrice };
  //   this.productService.addProduct(newProduct).subscribe((response) => {
  //     console.log("Product added:", response);
  //     // reset form
  //     this.productName = "";
  //     this.productPrice = 0;
  //   });
  // }
  // // ngOnInit() {
  // //   this.authService.getAuthState().subscribe((user) => {
  // //     if (user) {
  // //       this.isAdmin$ = this.authService
  // //         .getCurrentUserRole(user.uid)
  // //         .pipe(map((role) => role === "admin"));
  // //     }
  // //   });
  // // }
  // ngOnInit() {
  //   this.authService.getAuthState().subscribe((user) => {
  //     if (user) {
  //       console.log("Bejelentkezett felhasználó: ", user);
  //       this.isAdmin$ = this.authService.getCurrentUserRole(user.uid).pipe(
  //         map((role) => {
  //           console.log("Felhasználó szerepköre: ", role); // Ellenőrizd a szerepkört
  //           return role === "admin";
  //         })
  //       );
  //     } else {
  //       console.log("Nincs bejelentkezett felhasználó.");
  //     }
  //   });
  // }
}
