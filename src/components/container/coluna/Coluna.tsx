import * as S from "./styles";
import IconeTimer from "../../../assets/iconeTimer.svg?react";
import IconeTimerOff from "../../../assets/iconeTimerOff.svg?react";
import IconeDelete from "../../../assets/iconeDelete.svg?react";
import IconeMenu from "../../../assets/iconeMenu.svg?react";
import { Button } from "../../button/Button";
import { useEffect, useRef } from "react";
import { Tarefa } from "./tarefa/Tarefa";
import type { IColuna, ITarefa } from "../../../interfaces/Interfaces";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import IconeAdd from "../../../assets/iconeAdd.svg?react";

interface IColunaProps {
  coluna: IColuna;
  cronometro: boolean;
  colunaComCronometroAtivo: boolean;
  obterMsDecorridoTarefa: (tarefaId: string) => number;
  obterCronometroTarefa: (tarefaId: string) => { rodando: boolean };
  tarefaTemCronometroRegistrado: (tarefaId: string) => boolean;
  onToggleCronometroTarefa: (tarefaId: string) => void;
  onReiniciarCronometroTarefa: (tarefaId: string) => void;
  onToggleCronometro: () => void;
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
  cronometro,
  colunaComCronometroAtivo,
  obterMsDecorridoTarefa,
  obterCronometroTarefa,
  tarefaTemCronometroRegistrado,
  onToggleCronometroTarefa,
  onReiniciarCronometroTarefa,
  onToggleCronometro,
  onAdicionarTarefa,
  onAtualizarTarefa,
  onAtualizarTitulo,
  onRemoverColuna,
  onSolicitarRemocaoColuna,
  onRemoverTarefa,
  onSolicitarRemocaoTarefa,
}: IColunaProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: coluna.id,
    data: {
      tipo: "coluna",
    },
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  function removerColunaSeVazia() {
    if (coluna.texto.trim()) return;

    onRemoverColuna(coluna.id);
  }

  function ajustarAlturaTitulo(textarea: HTMLTextAreaElement) {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  function handleTituloKeyDown(
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) {
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

  useEffect(() => {
    if (!inputRef.current) return;

    ajustarAlturaTitulo(inputRef.current);
  }, [coluna.texto]);

  return (
    <S._Coluna ref={setNodeRef} style={style} data-dragging={isDragging}>
      <S._HeaderColuna>
        <S._MenuButton
          type="button"
          aria-label="Reordenar coluna"
          {...attributes}
          {...listeners}
        >
          <IconeMenu />
        </S._MenuButton>
        <S._Titulo
          ref={inputRef}
          rows={1}
          value={coluna.texto}
          onChange={(e) => {
            onAtualizarTitulo(coluna.id, e.target.value);
            ajustarAlturaTitulo(e.target);
          }}
          onBlur={removerColunaSeVazia}
          onKeyDown={handleTituloKeyDown}
        ></S._Titulo>
        <Button
          onClick={onToggleCronometro}
          style={{ boxShadow: "none" }}
          icone={
            colunaComCronometroAtivo && cronometro ? (
              <IconeTimer />
            ) : (
              <IconeTimerOff />
            )
          }
        />

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
            exibirCronometro={tarefaTemCronometroRegistrado(tarefa.id)}
            colunaComCronometroAtivo={colunaComCronometroAtivo}
            msDecorrido={obterMsDecorridoTarefa(tarefa.id)}
            cronometroRodando={obterCronometroTarefa(tarefa.id).rodando}
            onToggleCronometro={() => onToggleCronometroTarefa(tarefa.id)}
            onReiniciarCronometro={() => onReiniciarCronometroTarefa(tarefa.id)}
            onAtualizarDescricao={onAtualizarTarefa}
            onRemoverTarefa={onRemoverTarefa}
            onSolicitarRemocaoTarefa={onSolicitarRemocaoTarefa}
          />
        ))}
      </SortableContext>
      <Button
        text="Adicionar tarefa"
        icone={<IconeAdd />}
        style={{ backgroundColor: "#3665e4" }}
        onClick={() => onAdicionarTarefa(coluna.id)}
      />
    </S._Coluna>
  );
};
