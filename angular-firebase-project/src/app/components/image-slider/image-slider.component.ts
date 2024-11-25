import { Component, OnInit } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";

@Component({
  selector: "app-image-slider",
  templateUrl: "./image-slider.component.html",
  styleUrls: ["./image-slider.component.scss"],
  animations: [
    trigger("slideAnimation", [
      state("in", style({ opacity: 1, transform: "translateX(0)" })), // Fully visible and at original position
      state("out", style({ opacity: 0, transform: "translateX(-100%)" })), // Slide out to left
      state("rightOut", style({ opacity: 0, transform: "translateX(100%)" })), // Slide out to right
      transition("in => out", animate("800ms ease-in-out")), // Slower slide out left
      transition("in => rightOut", animate("800ms ease-in-out")), // Slower slide out right
      transition("out => in", animate("800ms ease-in-out")), // Slower slide in from left
      transition("rightOut => in", animate("800ms ease-in-out")), // Slower slide in from right
    ]),
  ],
})
export class ImageSliderComponent implements OnInit {
  slides: any[] = [
    {
      title: "székek",
      images: [
        "assets/images/szekek/header/image1.jpg",
        "assets/images/szekek/header/image2.jpg",
        "assets/images/szekek/header/image3.jpg",
      ],
      link: "/szekek",
    },
    {
      title: "fotelek",
      images: [
        "assets/images/fotelek/header/image1.jpg",
        "assets/images/fotelek/header/image2.jpg",
        "assets/images/fotelek/header/image3.jpg",
      ],
      link: "/fotelek",
    },
    {
      title: "recepciós asztalok",
      images: [
        "assets/images/recepcio/header/image1.jpg",
        "assets/images/recepcio/header/image2.jpg",
        "assets/images/recepcio/header/image3.jpg",
      ],
      link: "/recepciosAsztalok",
    },
    {
      title: "bárszékek",
      images: [
        "assets/images/barszek/header/image1.jpg",
        "assets/images/barszek/header/image2.jpg",
        "assets/images/barszek/header/image3.jpg",
      ],
      link: "/barszekek",
    },
    {
      title: "asztalok",
      images: [
        "assets/images/asztalok/header/image1.jpg",
        "assets/images/asztalok/header/image2.jpg",
        "assets/images/asztalok/header/image3.jpg",
      ],
      link: "/asztalok",
    },
    {
      title: "tároló bútorok",
      images: [
        "assets/images/tarolo/header/1.jpg",
        "assets/images/tarolo/header/2.jpg",
        "assets/images/tarolo/header/3.jpg",
      ],
      link: "/taroloButorok",
    },
  ];

  currentSlideIndex: number[] = Array(this.slides.length).fill(0);
  currentAnimationState: string[] = Array(this.slides.length).fill("in");

  constructor() {}

  ngOnInit(): void {
    this.startAutoSlide();
  }

  startAutoSlide(): void {
    this.slides.forEach((_, index) => {
      setInterval(() => {
        this.currentAnimationState[index] =
          index % 2 === 0 ? "out" : "rightOut"; // Slide out left or right
        setTimeout(() => {
          this.currentSlideIndex[index] =
            (this.currentSlideIndex[index] + 1) %
            this.slides[index].images.length; // Change to the next image
          this.currentAnimationState[index] = "in"; // Slide back in
        }, 800); // Match the animation duration
      }, 5000 + index * 1000); // Adjust time for staggered effect, total interval time is now longer
    });
  }

  getCurrentImage(slideIndex: number): string {
    return this.slides[slideIndex].images[this.currentSlideIndex[slideIndex]];
  }
}
