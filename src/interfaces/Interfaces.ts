export interface ITarefa {
  id: string;
  descricao: string;
}

export interface IColuna {
  id: string;
  texto: string;
  tarefas: ITarefa[];
}

export interface ICronometro {
  ativo: boolean;
  idColuna: string | null;
}
