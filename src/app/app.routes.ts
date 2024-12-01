import { Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { HomeComponent } from './page/home/home.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
  ];


// export const routes: Routes = [
//     // { path: '', redirectTo: '/login', pathMatch: 'full' },
//     { path: 'login', component: LoginComponent, children: [{path: 'home', component: HomeComponent}]},
//     // { path: 'home', component: HomeComponent}
//     // { path: 'login', loadComponent: () => import('./page/login/login.component').then(m => m.LoginComponent) }
// ];
