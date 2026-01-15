import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;
  showText = false;

  ngAfterViewInit(): void {
    const video = this.heroVideo.nativeElement;

    // Ha a videó befejeződik, jelenjen meg a szöveg
    video.addEventListener('ended', () => {
      this.showText = true;
      // fix utolsó képkocka (marad a videóból)
      video.pause();
    });
  }
}
