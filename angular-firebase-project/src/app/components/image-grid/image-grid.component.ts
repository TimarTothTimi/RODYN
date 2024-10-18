import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-image-grid",
  templateUrl: "./image-grid.component.html",
  styleUrls: ["./image-grid.component.scss"],
})
export class ImageGridComponent implements OnInit, OnDestroy {
  buttons: any[] = [
    {
      id: 0,
      image: "path/to/button-image1.jpg",
      images: [
        "path/to/image1-1.jpg",
        "path/to/image1-2.jpg",
        "path/to/image1-3.jpg",
      ],
    },
    {
      id: 1,
      image: "path/to/button-image2.jpg",
      images: [
        "path/to/image2-1.jpg",
        "path/to/image2-2.jpg",
        "path/to/image2-3.jpg",
      ],
    },
    {
      id: 2,
      image: "path/to/button-image3.jpg",
      images: [
        "path/to/image3-1.jpg",
        "path/to/image3-2.jpg",
        "path/to/image3-3.jpg",
      ],
    },
    {
      id: 3,
      image: "path/to/button-image4.jpg",
      images: [
        "path/to/image4-1.jpg",
        "path/to/image4-2.jpg",
        "path/to/image4-3.jpg",
      ],
    },
    {
      id: 4,
      image: "path/to/button-image5.jpg",
      images: [
        "path/to/image5-1.jpg",
        "path/to/image5-2.jpg",
        "path/to/image5-3.jpg",
      ],
    },
    {
      id: 5,
      image: "path/to/button-image6.jpg",
      images: [
        "path/to/image6-1.jpg",
        "path/to/image6-2.jpg",
        "path/to/image6-3.jpg",
      ],
    },
  ];

  translateX: number[] = [0, 0, 0, 0, 0, 0];
  slideIntervals: any[] = [];

  ngOnInit(): void {
    this.startSliding();
  }

  startSliding(): void {
    this.buttons.forEach((button, index) => {
      this.slideIntervals[index] = setInterval(() => {
        this.translateX[index] =
          this.translateX[index] === -100 * (button.images.length - 1)
            ? 0
            : this.translateX[index] - 100;
      }, 5000);
    });
  }

  onButtonClick(id: number): void {
    console.log(`Button ${id} clicked!`);
  }

  ngOnDestroy(): void {
    this.slideIntervals.forEach((interval) => clearInterval(interval));
  }
}
