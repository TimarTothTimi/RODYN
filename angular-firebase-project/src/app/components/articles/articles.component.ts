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
      mediaUrl: "/videos/irodaiszek.mp4",
      title: "Irodai szék deréktámasz",
      description: "Miért jó a deréktámasz az irodai székeknél? Miért előnyös?",
      link: "/article1",
    },
    {
      isVideo: false,
      mediaUrl:
        "https://images.unsplash.com/photo-1527167598984-8802d8028eea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "A szövetek kopásállósága",
      description:
        "Miért fontos a kopásállóság? Miben mérjük a kopásállóságot?",
      link: "/article2",
    },
    {
      isVideo: false,

      mediaUrl:
        "https://plus.unsplash.com/premium_photo-1675798693124-7f505e44ba2d?q=80&w=1902&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Bőr és műbőr ápolása és tisztítása",
      description:
        "A rendszeres tisztítás és ápolás meghosszabbítja a kárpitok élettartamát.",
      link: "/article3",
    },
    {
      isVideo: false,

      mediaUrl:
        "https://plus.unsplash.com/premium_photo-1681487178876-a1156952ec60?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Irodai asztalok",
      description:
        "Az irodai asztalok a munkahelyi környezet meghatározó bútordarabjai.",
      link: "/article4",
    },
    {
      isVideo: false,

      mediaUrl:
        "https://images.unsplash.com/photo-1543325042-c67825847491?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fHJlY2VwdGlvbiUyMGRlc2t8ZW58MHx8MHx8fDA%3D",
      title: "Recepciós asztalok",
      description:
        "Ezek az asztalok nemcsak a munkavégzés hatékonyságát segítik elő",
      link: "/article5",
    },
    {
      isVideo: false,

      mediaUrl:
        "https://images.unsplash.com/photo-1541558869434-2840d308329a?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "A FENIX anyag, miért jó választás?",
      description:
        "A FENIX egy speciális, nanotechnológiával előállított anyag.",
      link: "/article6",
    },
    {
      isVideo: false,

      mediaUrl:
        "https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "A jó munkakörnyezet",
      description:
        "A jó munkakörnyezet kialakítása alapvetően befolyásolja a dolgozók teljesítményét.",
      link: "/article7",
    },
    {
      isVideo: false,

      mediaUrl:
        "https://plus.unsplash.com/premium_photo-1683120864014-0dda85e3e52c?q=80&w=1978&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "A kényelem és stílus ikonikus bútordarabjai",
      description: "A mindennapi kényelem egyik alappillére is.",
      link: "/article8",
    },
    {
      isVideo: false,
      mediaUrl:
        "https://images.unsplash.com/photo-1571624436279-b272aff752b5?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "A tárgyalóasztalok",
      description: "A tárgyalóasztalok alapvető szerepet játszanak...",
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
