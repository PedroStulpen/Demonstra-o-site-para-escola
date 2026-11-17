import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';

const autenticado = () => inject(AuthService).usuario() ? true : inject(Router).parseUrl('/login');

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./pages/login/login').then((m) => m.LoginComponent) },
  { path: 'home', canActivate: [autenticado], loadComponent: () => import('./pages/home/home').then((m) => m.HomeComponent) },
  { path: 'alunos', canActivate: [autenticado], loadComponent: () => import('./pages/alunos/alunos').then((m) => m.AlunosComponent) },
  { path: 'notas', canActivate: [autenticado], loadComponent: () => import('./pages/notas/notas').then((m) => m.NotasComponent) },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', redirectTo: 'home' },
];
