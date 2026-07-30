import * as S from "./styles";
import IconeTimer from "../../../assets/iconeTimer.svg?react";
import IconeDelete from "../../../assets/iconeDelete.svg?react";
import { Button } from "../../Button/Button";
import { useEffect, useRef } from "react";
import { Tarefa } from "./tarefa/Tarefa";
import type { IColuna, ITarefa } from "../../../interfaces/Interfaces";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import IconeAdd from "../../../assets/iconeAdd.svg?react";
interface IColunaProps {
  coluna: IColuna;
  onAdicionarTarefa: (colunaId: string) => void;
  onAtualizarTarefa: (tarefaId: string, descricao: string) => void;
  onAtualizarTitulo: (colunaId: string, texto: string) => void;
  onRemoverColuna: (colunaId: string) => void;
  onSolicitarRemocaoColuna: (coluna: IColuna) => void;
  onRemoverTarefa: (tarefaId: string) => void;
  onSolicitarRemocaoTarefa: (tarefa: ITarefa) => void;
}

export const Coluna = ({
  coluna,
  onAdicionarTarefa,
  onAtualizarTarefa,
  onAtualizarTitulo,
  onRemoverColuna,
  onSolicitarRemocaoColuna,
  onRemoverTarefa,
  onSolicitarRemocaoTarefa,
}: IColunaProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setNodeRef } = useDroppable({ id: coluna.id });

  function removerColunaSeVazia() {
    if (coluna.texto.trim()) return;

    onRemoverColuna(coluna.id);
  }

  function handleTituloKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") return;

    event.preventDefault();

    if (!coluna.texto.trim()) {
      onRemoverColuna(coluna.id);
      return;
    }

    event.currentTarget.blur();
  }




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
          onBlur={removerColunaSeVazia}
          onKeyDown={handleTituloKeyDown}
        ></S._Titulo>
        <IconeTimer />
        <Button
          onClick={() => onSolicitarRemocaoColuna(coluna)}
          style={{ boxShadow: "none" }}
          icone={<IconeDelete />}
        />
       
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
            onRemoverTarefa={onRemoverTarefa}
            onSolicitarRemocaoTarefa={onSolicitarRemocaoTarefa}
          />
        ))}
      </SortableContext>
      <Button
        text="Adicionar tarefa"
        icone={<IconeAdd />}
        style={{backgroundColor: "#3665e4"}}
        onClick={() => onAdicionarTarefa(coluna.id)}
      />
    </S._Coluna>
  );
};
