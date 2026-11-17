import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { NavbarComponent } from './shared/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `@if (auth.usuario()) { <app-navbar /> } <router-outlet />`,
})
export class AppComponent {
  constructor(public auth: AuthService) {}
}
