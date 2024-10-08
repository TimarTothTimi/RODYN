import { Component } from "@angular/core";

@Component({
  selector: "app-articles",
  templateUrl: "./articles.component.html",
  styleUrl: "./articles.component.scss",
})
export class ArticlesComponent {
  articles = [
    {
      isVideo: true,
      mediaUrl: "/videos/navBg.mp4",
      title: "Article 1",
      description:
        "1With supporting text below as a natural lead-in to additional content.",
      link: "/article1",
    },
    {
      isVideo: false,
      mediaUrl:
        "https://images.unsplash.com/photo-1571624436279-b272aff752b5?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Article 2",
      description:
        "2With supporting text below as a natural lead-in to additional content.",
      link: "/article2",
    },
    {
      isVideo: false,

      mediaUrl:
        "https://images.unsplash.com/photo-1571624436279-b272aff752b5?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Article 3",
      description:
        "3With supporting text below as a natural lead-in to additional content.",
      link: "/article3",
    },
    {
      isVideo: false,

      mediaUrl:
        "https://images.unsplash.com/photo-1571624436279-b272aff752b5?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Article 4",
      description:
        "4With supporting text below as a natural lead-in to additional content.",
      link: "/article4",
    },
    {
      isVideo: false,

      mediaUrl:
        "https://images.unsplash.com/photo-1571624436279-b272aff752b5?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Article 5",
      description:
        "5With supporting text below as a natural lead-in to additional content.",
      link: "/article5",
    },
    {
      isVideo: false,

      mediaUrl:
        "https://images.unsplash.com/photo-1571624436279-b272aff752b5?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Article 6",
      description:
        "6With supporting text below as a natural lead-in to additional content.",
      link: "/article6",
    },
    {
      isVideo: false,

      mediaUrl:
        "https://images.unsplash.com/photo-1571624436279-b272aff752b5?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Article 7",
      description:
        "7With supporting text below as a natural lead-in to additional content.",
      link: "/article7",
    },
    {
      isVideo: false,

      mediaUrl:
        "https://images.unsplash.com/photo-1571624436279-b272aff752b5?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Article 8",
      description:
        "8With supporting text below as a natural lead-in to additional content.",
      link: "/article8",
    },
    {
      isVideo: true,
      mediaUrl: "/videos/navBg.mp4",
      title: "Article 9",
      description:
        "9With supporting text below as a natural lead-in to additional content.",
      link: "/article9",
    },
  ];

  // Csoportosítjuk az elemeket 3-asával
  chunkArticles(chunkSize: number) {
    const chunks = [];
    for (let i = 0; i < this.articles.length; i += chunkSize) {
      chunks.push(this.articles.slice(i, i + chunkSize));
    }
    return chunks;
  }

  groupedArticles = this.chunkArticles(3); // Hármasával csoportosítjuk az elemeket
}
