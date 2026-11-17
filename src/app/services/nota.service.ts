import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NotaDisciplina } from '../models/aluno';

export const DISCIPLINAS = ['Português', 'Matemática', 'Ciências', 'História', 'Geografia'];

@Injectable({ providedIn: 'root' })
export class NotaService {
  private chave = (id: number) => 'escola_notas_' + id;

  listar(alunoId: number): Observable<NotaDisciplina[]> {
    const d = localStorage.getItem(this.chave(alunoId));
    return of(d ? JSON.parse(d) : DISCIPLINAS.map((disciplina) => ({ disciplina, notas: [null, null, null, null] })));
  }
  salvar(alunoId: number, linhas: NotaDisciplina[]): Observable<boolean> {
    localStorage.setItem(this.chave(alunoId), JSON.stringify(linhas));
    return of(true);
  }
}
