import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlunoService } from '../../services/aluno.service';

@Component({ selector: 'app-home', standalone: true, imports: [RouterLink], templateUrl: './home.html' })
export class HomeComponent implements OnInit {
  ativos = 0;
  turmas = 0;

  constructor(public auth: AuthService, private alunoService: AlunoService) {}

  ngOnInit() {
    this.alunoService.listar().subscribe((l) => {
      const ativos = l.filter((a) => a.ativo);
      this.ativos = ativos.length;
      this.turmas = new Set(ativos.map((a) => a.turma)).size;
    });
  }
}
