import { Routes } from '@angular/router';
import { HomeCheck } from './components/home-check/home-check';
import { UpdateUser } from './components/update-user/update-user';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeCheck,
  },
  {
    path: 'home/:email',
    component: HomeCheck,
  },
  {
    path: 'update',
    component: UpdateUser,
  },
];
