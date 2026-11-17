import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export interface Usuario { nome: string; email: string; cargo: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Usuário de demonstração
  private readonly demo = { email: 'admin@escola.com', senha: '123456', nome: 'Maria Souza', cargo: 'Coordenadora pedagógica' };
  usuario = signal<Usuario | null>(JSON.parse(localStorage.getItem('escola_usuario') ?? 'null'));

  constructor(private router: Router) {}

  entrar(email: string, senha: string): boolean {
    if (email !== this.demo.email || senha !== this.demo.senha) return false;
    const u = { nome: this.demo.nome, email, cargo: this.demo.cargo };
    localStorage.setItem('escola_usuario', JSON.stringify(u));
    this.usuario.set(u);
    return true;
  }

  sair() {
    localStorage.removeItem('escola_usuario');
    this.usuario.set(null);
    this.router.navigate(['/login']);
  }
}
