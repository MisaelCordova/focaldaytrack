import * as S from "./styles";
import IconeTimer from "../../../assets/iconeTimer.svg?react";
import IconeDelete from "../../../assets/iconeDelete.svg?react";
import { Button } from "../../Button/Button";
import { useEffect, useRef } from "react";
import { Tarefa } from "./tarefa/Tarefa";
import type { IColuna } from "../../../interfaces/Interfaces";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

interface IColunaProps {
  coluna: IColuna;
  onAdicionarTarefa: (colunaId: string) => void;
  onAtualizarTarefa: (tarefaId: string, descricao: string) => void;
  onAtualizarTitulo: (colunaId: string, texto: string) => void;
}

export const Coluna = ({
  coluna,
  onAdicionarTarefa,
  onAtualizarTarefa,
  onAtualizarTitulo,
}: IColunaProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setNodeRef } = useDroppable({ id: coluna.id });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <S._Coluna ref={setNodeRef}>
      <S._HeaderColuna>
        <S._Titulo
          ref={inputRef}
          value={coluna.texto}
          onChange={(e) => onAtualizarTitulo(coluna.id, e.target.value)}
        ></S._Titulo>
        <IconeTimer />
        <IconeDelete />
      </S._HeaderColuna>
      <SortableContext
        items={coluna.tarefas.map((tarefa) => tarefa.id)}
        strategy={verticalListSortingStrategy}
      >
        {coluna.tarefas.map((tarefa) => (
          <Tarefa
            key={tarefa.id}
            {...tarefa}
            onAtualizarDescricao={onAtualizarTarefa}
          />
        ))}
      </SortableContext>
      <Button
        text="Adicionar tarefa"
        onClick={() => onAdicionarTarefa(coluna.id)}
      />
    </S._Coluna>
  );
};
