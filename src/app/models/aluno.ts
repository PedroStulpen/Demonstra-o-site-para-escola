export interface Aluno { id?: number; nome: string; matricula: string; turma: string; responsavel: string; telefone: string; ativo: boolean; }
export interface NotaDisciplina { disciplina: string; notas: (number | null)[]; }
