import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class HeaderComponent {}
