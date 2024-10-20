import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"],
})
export class ImageButtonsComponent implements OnInit {
  buttons = [
    {
      title: "Product 1",
      images: [
        "assets/product1-img1.jpg",
        "assets/product1-img2.jpg",
        "assets/product1-img3.jpg",
      ],
    },
    {
      title: "Product 2",
      images: [
        "assets/product2-img1.jpg",
        "assets/product2-img2.jpg",
        "assets/product2-img3.jpg",
      ],
    },
    {
      title: "Product 3",
      images: [
        "assets/product3-img1.jpg",
        "assets/product3-img2.jpg",
        "assets/product3-img3.jpg",
      ],
    },
    {
      title: "Product 4",
      images: [
        "assets/product4-img1.jpg",
        "assets/product4-img2.jpg",
        "assets/product4-img3.jpg",
      ],
    },
    {
      title: "Product 5",
      images: [
        "assets/product5-img1.jpg",
        "assets/product5-img2.jpg",
        "assets/product5-img3.jpg",
      ],
    },
    {
      title: "Product 6",
      images: [
        "assets/product6-img1.jpg",
        "assets/product6-img2.jpg",
        "assets/product6-img3.jpg",
      ],
    },
  ];
  currentIndices: number[] = [0, 0, 0, 0, 0, 0];
  intervalIds: any[] = [];

  ngOnInit(): void {
    this.buttons.forEach((button, index) => {
      this.startCarousel(index);
    });
  }

  startCarousel(index: number) {
    this.intervalIds[index] = setInterval(() => {
      const randomDirection = Math.random() >= 0.5 ? 1 : -1;
      this.currentIndices[index] =
        (this.currentIndices[index] +
          randomDirection +
          this.buttons[index].images.length) %
        this.buttons[index].images.length;
      this.updateCarousel(index);
    }, 3000); // Képek váltása 3 másodpercenként
  }

  updateCarousel(index: number) {
    const carousel = document.querySelectorAll(".carousel")[
      index
    ] as HTMLElement;
    carousel.style.transform = `translateX(-${
      this.currentIndices[index] * 100
    }%)`;
  }

  ngOnDestroy(): void {
    // Megállítja a karusszel időzítőket amikor a komponens megszűnik
    this.intervalIds.forEach((id) => clearInterval(id));
  }
}
