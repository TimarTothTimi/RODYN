import { Component, HostListener } from "@angular/core";

@Component({
  selector: "app-center-section",
  templateUrl: "./floating.section.html",
  styleUrls: ["./floating.section.scss"],
})
export class CenterSectionComponent {
  scrollPosition = 0;

  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.scrollPosition = window.pageYOffset;
  }
}
