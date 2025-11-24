import { Routes } from '@angular/router';
import { HomeCheck } from './components/home-check/home-check';

export const routes: Routes = [
  {
    path: '',
    component: HomeCheck,
  },
  {
    path: ':email',
    component: HomeCheck,
  },
];
