import { Component, HostListener } from "@angular/core";

@Component({
    selector: "app-floating-section",
    templateUrl: "./floating-section.html",
    styleUrls: ["./floating-section.scss"],
    standalone: false
})
export class FloatingSectionComponent {
  scrollPosition = 0;

  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.scrollPosition = window.pageYOffset;
  }
}
