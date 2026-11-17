import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({ selector: 'app-navbar', standalone: true, imports: [RouterLink, RouterLinkActive], templateUrl: './navbar.html' })
export class NavbarComponent {
  constructor(public auth: AuthService) {}
  get nomeUsuario() { return this.auth.usuario()?.nome ?? ''; }
  sair() { this.auth.sair(); }
}
