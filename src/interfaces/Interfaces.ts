export interface ITarefa {
  id: string;
  descricao: string;
}

export interface IColuna {
  id: string;
  texto: string;
  tarefas: ITarefa[];
}
