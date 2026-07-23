import { useEffect, useRef } from "react";
import * as S from "./styles";
import type { ITarefa } from "../../../../interfaces/Interfaces";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ITarefaProps extends ITarefa {
  onAtualizarDescricao: (tarefaId: string, descricao: string) => void;
}

export const Tarefa = ({
  id,
  descricao,
  onAtualizarDescricao,
}: ITarefaProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  function ajustarAltura(textarea: HTMLTextAreaElement) {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!inputRef.current) return;

    ajustarAltura(inputRef.current);
  }, [descricao]);

  return (
    <S._CardTarefa
      ref={setNodeRef}
      style={style}
      data-dragging={isDragging}
      {...attributes}
      {...listeners}
    >
      <S._Texto
        id={`tarefa-${id}-descricao`}
        name={`tarefas.${id}.descricao`}
        aria-label="Descricao da tarefa"
        ref={inputRef}
        rows={1}
        value={descricao}
        onChange={(e) => {
          onAtualizarDescricao(id, e.target.value);
          ajustarAltura(e.target);
        }}
      />
    </S._CardTarefa>
  );
};
