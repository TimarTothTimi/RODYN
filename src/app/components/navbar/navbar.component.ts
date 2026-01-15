import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule], // 👈 EZ KELL
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  menuOpen = false;

  menu = [
    { label: 'Főoldal', path: '/' },
    { label: 'Termékek', path: '/termekek' },
    { label: 'Rólunk', path: '/rolunk' },
    { label: 'Inspiráció', path: '/inspiracio' },
    { label: 'Kapcsolat', path: '/kapcsolat' },
  ];

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
