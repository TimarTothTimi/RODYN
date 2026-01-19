import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Termekek } from './pages/termekek/termekek';
import { Rolunk } from './pages/rolunk/rolunk';
import { Inspiracio } from './pages/inspiracio/inspiracio';
import { KapcsolatComponent } from './pages/kapcsolat/kapcsolat';
// importáld később a többi oldalt is
export const routes: Routes = [
  { path: '', component: Home },
  { path: 'termekek', component: Termekek },
  { path: 'rolunk', component: Rolunk },
  { path: 'inspiracio', component: Inspiracio },
  { path: 'kapcsolat', component: KapcsolatComponent },
  { path: '**', redirectTo: '' },
];
