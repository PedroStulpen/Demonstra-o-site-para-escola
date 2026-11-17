import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Aluno } from '../../models/aluno';
import { AlunoService } from '../../services/aluno.service';
import { DialogAlunoComponent } from './dialog-aluno/dialog-aluno';

@Component({ selector: 'app-alunos', standalone: true, imports: [FormsModule, NgbModule], templateUrl: './alunos.html' })
export class AlunosComponent implements OnInit {
  vazio = true;
  filtro = '';
  status = 'Ativo';
  posicao = 'asc';

  lista: Aluno[] = [];
  listaFull: Aluno[] = [];
  listaAux: Aluno[] = [];

  page = 1;
  pageSize = 10;
  collectionSize = 0;
  firstIndex = 0;
  lastIndex = 0;

  constructor(private modalService: NgbModal, private alunoService: AlunoService) {}

  ngOnInit() { this.localizar(); }

  localizar() {
    this.alunoService.listar().subscribe((data) => {
      this.listaFull = [...data];
      this.applyFilter();
    });
  }

  applyFilter() {
    const ativo = this.status === 'Ativo';
    const f = this.filtro.toLowerCase();
    this.listaAux = this.listaFull.filter(
      (a) => a.ativo === ativo && [a.nome, a.matricula, a.turma, a.responsavel, a.telefone].some((v) => (v ?? '').toLowerCase().includes(f)),
    );
    this.page = 1;
    this.collectionSize = this.listaAux.length;
    this.vazio = this.listaAux.length === 0;
    this.paginacao();
  }

  sortOn(coluna: keyof Aluno) {
    const dir = this.posicao === 'asc' ? 1 : -1;
    this.listaAux.sort((a, b) => ((a[coluna] ?? '') < (b[coluna] ?? '') ? -dir : (a[coluna] ?? '') > (b[coluna] ?? '') ? dir : 0));
    this.posicao = this.posicao === 'asc' ? 'desc' : 'asc';
    this.page = 1;
    this.paginacao();
  }

  paginacao() {
    const totalPages = Math.ceil(this.listaAux.length / this.pageSize) || 1;
    if (this.page > totalPages) this.page = totalPages;
    const inicio = (this.page - 1) * this.pageSize;
    this.lista = this.listaAux.slice(inicio, inicio + this.pageSize);
    this.firstIndex = this.lista.length ? inicio + 1 : 0;
    this.lastIndex = inicio + this.lista.length;
  }

  cadastrar() { this.abrirDialog(); }
  alterar(info: Aluno) { this.abrirDialog(info); }

  private abrirDialog(info?: Aluno) {
    const modalRef = this.modalService.open(DialogAlunoComponent, { backdrop: 'static', keyboard: false, size: 'lg' });
    if (info) modalRef.componentInstance.info = { ...info };
    modalRef.result.then((r) => r === 'ok' && this.localizar(), () => {});
  }

  excluir(info: Aluno) {
    if (confirm('Deseja realmente excluir o aluno ' + info.nome + '?')) {
      this.alunoService.excluir(info.id!).subscribe(() => this.localizar());
    }
  }
}
