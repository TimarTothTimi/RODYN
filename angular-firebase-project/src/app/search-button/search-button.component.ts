import { Component } from "@angular/core";

@Component({
    selector: "app-search-button",
    templateUrl: "./search-button.component.html",
    styleUrls: ["./search-button.component.scss"],
    standalone: false
})
export class SearchButtonComponent {
  onSearchClick() {
    console.log("Keresés indítva");
    // Itt indíthatunk egy keresést a termékek között
  }
}
