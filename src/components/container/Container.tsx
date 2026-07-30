import { useState } from "react";
import {
  closestCorners,
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Button } from "../Button/Button";
import { Coluna } from "./coluna/Coluna";

import * as S from "./styles";
import type { IColuna, ITarefa } from "../../interfaces/Interfaces";

export const Container = () => {
  const [colunas, setColunas] = useState<IColuna[]>([]);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  function encontrarColunaPorTarefa(tarefaId: string, colunasAtuais: IColuna[]) {
    return colunasAtuais.find((coluna) =>
      coluna.tarefas.some((tarefa) => tarefa.id === tarefaId)
    );
  }

  function encontrarColunaPorDrop(id: string, colunasAtuais: IColuna[]) {
    return (
      colunasAtuais.find((coluna) => coluna.id === id) ??
      encontrarColunaPorTarefa(id, colunasAtuais)
    );
  }

  function adicionarColuna() {
    setColunas((colunasAtuais) => [
      ...colunasAtuais,
      {
        id: crypto.randomUUID(),
        texto: "",
        tarefas: [],
      },
    ]);
  }

  function adicionarTarefa(colunaId: string) {
    setColunas((colunasAtuais) =>
      colunasAtuais.map((coluna) => {
        if (coluna.id !== colunaId) return coluna;

        return {
          ...coluna,
          tarefas: [
            ...coluna.tarefas,
            {
              id: crypto.randomUUID(),
              descricao: "",
            },
          ],
        };
      })
    );
  }

  function removerColuna(colunaId: string) {
    setColunas((colunasAtuais) =>
      colunasAtuais.filter((coluna) => coluna.id !== colunaId)
    );
  }

  function removerTarefa(tarefaId: string) {
    setColunas((colunasAtuais) =>
      colunasAtuais.map((coluna) => ({
        ...coluna,
        tarefas: coluna.tarefas.filter((tarefa) => tarefa.id !== tarefaId),
      }))
    );
  }

  function atualizarTarefa(tarefaId: string, descricao: string) {
    setColunas((colunasAtuais) =>
      colunasAtuais.map((coluna) => ({
        ...coluna,
        tarefas: coluna.tarefas.map((tarefa) =>
          tarefa.id === tarefaId ? { ...tarefa, descricao } : tarefa
        ),
      }))
    );
  }

  function atualizarTituloColuna(colunaId: string, texto: string) {
    setColunas((colunasAtuais) =>
      colunasAtuais.map((coluna) =>
        coluna.id === colunaId ? { ...coluna, texto } : coluna
      )
    );
  }

  function moverTarefaEntreColunas({
    tarefaMovida,
    colunaOrigem,
    colunaDestino,
    overId,
    colunasAtuais,
  }: {
    tarefaMovida: ITarefa;
    colunaOrigem: IColuna;
    colunaDestino: IColuna;
    overId: string;
    colunasAtuais: IColuna[];
  }) {
    const tarefasOrigem = colunaOrigem.tarefas.filter(
      (tarefa) => tarefa.id !== tarefaMovida.id
    );
    const tarefasDestino = [...colunaDestino.tarefas];
    const tarefaDestinoIndex = tarefasDestino.findIndex(
      (tarefa) => tarefa.id === overId
    );
    const novoIndex =
      tarefaDestinoIndex >= 0 ? tarefaDestinoIndex : tarefasDestino.length;

    tarefasDestino.splice(novoIndex, 0, tarefaMovida);

    return colunasAtuais.map((coluna) => {
      if (coluna.id === colunaOrigem.id) {
        return { ...coluna, tarefas: tarefasOrigem };
      }

      if (coluna.id === colunaDestino.id) {
        return { ...coluna, tarefas: tarefasDestino };
      }

      return coluna;
    });
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setColunas((colunasAtuais) => {
      const activeId = String(active.id);
      const overId = String(over.id);
      const colunaOrigem = encontrarColunaPorTarefa(activeId, colunasAtuais);
      const colunaDestino = encontrarColunaPorDrop(overId, colunasAtuais);

      if (!colunaOrigem || !colunaDestino) return colunasAtuais;
      if (colunaOrigem.id === colunaDestino.id) return colunasAtuais;

      const tarefaMovida = colunaOrigem.tarefas.find(
        (tarefa) => tarefa.id === activeId
      );

      if (!tarefaMovida) return colunasAtuais;

      return moverTarefaEntreColunas({
        tarefaMovida,
        colunaOrigem,
        colunaDestino,
        overId,
        colunasAtuais,
      });
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setColunas((colunasAtuais) => {
      const activeId = String(active.id);
      const overId = String(over.id);
      const colunaOrigem = encontrarColunaPorTarefa(activeId, colunasAtuais);
      const colunaDestino = encontrarColunaPorDrop(overId, colunasAtuais);

      if (!colunaOrigem || !colunaDestino) return colunasAtuais;
      if (colunaOrigem.id !== colunaDestino.id) return colunasAtuais;

      const oldIndex = colunaOrigem.tarefas.findIndex(
        (tarefa) => tarefa.id === activeId
      );
      const overColumnId = colunaDestino.id === overId;
      const newIndex = overColumnId
        ? colunaOrigem.tarefas.length - 1
        : colunaOrigem.tarefas.findIndex((tarefa) => tarefa.id === overId);

      if (oldIndex < 0 || newIndex < 0) return colunasAtuais;

      return colunasAtuais.map((coluna) =>
        coluna.id === colunaOrigem.id
          ? { ...coluna, tarefas: arrayMove(coluna.tarefas, oldIndex, newIndex) }
          : coluna
      );
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <S._Container>
        {colunas.map((coluna) => (
          <Coluna
            key={coluna.id}
            coluna={coluna}
            onAdicionarTarefa={adicionarTarefa}
            onAtualizarTarefa={atualizarTarefa}
            onAtualizarTitulo={atualizarTituloColuna}
            onRemoverColuna={removerColuna}
            onRemoverTarefa={removerTarefa}
          />
        ))}
        <Button
          onClick={() => adicionarColuna()}
          text="Adicionar Coluna"
          style={{ height: "fit-content" }}
        />
      </S._Container>
    </DndContext>
  );
};
