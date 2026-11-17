import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Aluno } from '../../../models/aluno';
import { AlunoService } from '../../../services/aluno.service';

@Component({ selector: 'app-dialog-aluno', standalone: true, imports: [FormsModule], templateUrl: './dialog-aluno.html' })
export class DialogAlunoComponent {
  info: Aluno = { nome: '', matricula: '', turma: '', responsavel: '', telefone: '', ativo: true };
  erro = '';

  constructor(public modal: NgbActiveModal, private alunoService: AlunoService) {}

  salvar() {
    if (!this.info.nome.trim() || !this.info.matricula.trim() || !this.info.turma.trim()) {
      this.erro = 'Preencha nome, matrícula e turma.';
      return;
    }
    this.alunoService.salvar(this.info).subscribe(() => this.modal.close('ok'));
  }
}
