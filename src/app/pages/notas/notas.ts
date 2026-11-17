import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Aluno, NotaDisciplina } from '../../models/aluno';
import { AlunoService } from '../../services/aluno.service';
import { NotaService } from '../../services/nota.service';

@Component({ selector: 'app-notas', standalone: true, imports: [FormsModule], templateUrl: './notas.html' })
export class NotasComponent implements OnInit {
  alunos: Aluno[] = [];
  alunoId: number | null = null;
  linhas: NotaDisciplina[] = [];
  salvo = false;

  constructor(private alunoService: AlunoService, private notaService: NotaService) {}

  ngOnInit() { this.alunoService.listar().subscribe((l) => (this.alunos = l.filter((a) => a.ativo))); }

  selecionar() {
    this.salvo = false;
    if (this.alunoId) this.notaService.listar(this.alunoId).subscribe((l) => (this.linhas = l));
    else this.linhas = [];
  }

  media(l: NotaDisciplina): number | null {
    const n = l.notas.filter((x): x is number => x !== null && x !== undefined && (x as unknown) !== '');
    return n.length ? n.reduce((s, x) => s + Number(x), 0) / n.length : null;
  }

  situacao(l: NotaDisciplina): string {
    const m = this.media(l);
    return m === null ? '—' : m >= 6 ? 'Aprovado' : 'Em recuperação';
  }

  salvar() {
    this.notaService.salvar(this.alunoId!, this.linhas).subscribe(() => (this.salvo = true));
  }
}
