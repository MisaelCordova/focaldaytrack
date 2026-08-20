import { useEffect, useRef } from "react";
import * as S from "./styles";
import type { ITarefa } from "../../../../interfaces/Interfaces";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import IconeDelete from "../../../../assets/iconeDelete.svg?react";
import { Cronometro } from "../../../cronometro/Cronometro";

interface ITarefaProps extends ITarefa {
  exibirCronometro: boolean;
  colunaComCronometroAtivo: boolean;
  msDecorrido: number;
  cronometroRodando: boolean;
  onToggleCronometro: () => void;
  onReiniciarCronometro: () => void;
  onAtualizarDescricao: (tarefaId: string, descricao: string) => void;
  onRemoverTarefa: (tarefaId: string) => void;
  onSolicitarRemocaoTarefa: (tarefa: ITarefa) => void;
}

export const Tarefa = ({
  id,
  descricao,
  exibirCronometro,
  colunaComCronometroAtivo,
  msDecorrido,
  cronometroRodando,
  onToggleCronometro,
  onReiniciarCronometro,
  onAtualizarDescricao,
  onRemoverTarefa,
  onSolicitarRemocaoTarefa,
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

  function removerTarefaSeVazia() {
    if (descricao.trim()) return;

    onRemoverTarefa(id);
  }

  function handleDescricaoKeyDown(
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) {
    if (event.key !== "Enter" || event.shiftKey) return;

    event.preventDefault();

    if (!descricao.trim()) {
      onRemoverTarefa(id);
      return;
    }

    event.currentTarget.blur();
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
      <S._HeaderCard>
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
          onBlur={removerTarefaSeVazia}
          onKeyDown={handleDescricaoKeyDown}
        />
        <S._DeleteButton
          type="button"
          aria-label="Excluir tarefa"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            onSolicitarRemocaoTarefa({ id, descricao });
          }}
        >
          <IconeDelete />
        </S._DeleteButton>
      </S._HeaderCard>
      {exibirCronometro && (
        <Cronometro
          colunaComCronometroAtivo={colunaComCronometroAtivo}
          msDecorrido={msDecorrido}
          rodando={cronometroRodando}
          onToggle={onToggleCronometro}
          onReiniciar={onReiniciarCronometro}
        />
      )}
    </S._CardTarefa>
  );
};
