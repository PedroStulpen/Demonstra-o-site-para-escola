import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Aluno } from '../models/aluno';

const SEED: Aluno[] = [
  ['Ana Beatriz Lima', '2024001', '7º A'], ['Bruno Carvalho', '2024002', '7º A'], ['Camila Rocha', '2024003', '7º B'],
  ['Daniel Ferreira', '2024004', '8º A'], ['Elisa Monteiro', '2024005', '8º A'], ['Felipe Andrade', '2024006', '8º B'],
  ['Gabriela Nunes', '2024007', '9º A'], ['Henrique Duarte', '2024008', '9º A'],
].map(([nome, matricula, turma], i) => ({ id: i + 1, nome, matricula, turma, responsavel: 'Responsável de ' + nome.split(' ')[0], telefone: '(24) 99999-000' + i, ativo: true }));

// Simula uma API usando localStorage (troque por HttpClient quando houver backend)
@Injectable({ providedIn: 'root' })
export class AlunoService {
  private chave = 'escola_alunos';
  private ler(): Aluno[] {
    const d = localStorage.getItem(this.chave);
    if (d) return JSON.parse(d);
    this.gravar(SEED);
    return SEED;
  }
  private gravar(l: Aluno[]) { localStorage.setItem(this.chave, JSON.stringify(l)); }

  listar(): Observable<Aluno[]> { return of(this.ler()); }
  salvar(a: Aluno): Observable<Aluno> {
    const l = this.ler();
    if (a.id) l[l.findIndex((x) => x.id === a.id)] = a;
    else { a.id = Date.now(); l.push(a); }
    this.gravar(l);
    return of(a);
  }
  excluir(id: number): Observable<boolean> { this.gravar(this.ler().filter((x) => x.id !== id)); return of(true); }
}
