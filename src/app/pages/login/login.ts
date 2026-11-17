import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({ selector: 'app-login', standalone: true, imports: [FormsModule], templateUrl: './login.html' })
export class LoginComponent {
  email = 'admin@escola.com';
  senha = '123456';
  erro = '';

  constructor(private auth: AuthService, private router: Router) {}

  entrar() {
    if (this.auth.entrar(this.email, this.senha)) this.router.navigate(['/home']);
    else this.erro = 'E-mail ou senha incorretos.';
  }
}
