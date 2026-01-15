import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    // RouterModule kell, ha routerLink vagy router-outlet is van
  ],
  templateUrl: './home.html',
})
export class Home {}
