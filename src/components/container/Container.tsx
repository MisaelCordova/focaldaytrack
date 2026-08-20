import { useEffect, useState } from "react";
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
import { Button } from "../button/Button";
import { Coluna } from "./coluna/Coluna";
import IconeAdd from "../../assets/iconeAdd.svg?react";
import { ConfirmModal } from "../confirmModal/ConfirmModal";
import * as S from "./styles";
import type { IColuna, ITarefa } from "../../interfaces/Interfaces";

type CronometroTarefa = {
  rodando: boolean;
  iniciadoEm: number | null;
  msAcumulados: number;
};

const COLUNAS_STORAGE_KEY = "@FocalDayTrack:colunas";
const getTimestamp = () => performance.now();

function isTarefa(valor: unknown): valor is ITarefa {
  if (!valor || typeof valor !== "object") return false;

  const tarefa = valor as ITarefa;

  return typeof tarefa.id === "string" && typeof tarefa.descricao === "string";
}

function isColuna(valor: unknown): valor is IColuna {
  if (!valor || typeof valor !== "object") return false;

  const coluna = valor as IColuna;

  return (
    typeof coluna.id === "string" &&
    typeof coluna.texto === "string" &&
    Array.isArray(coluna.tarefas) &&
    coluna.tarefas.every(isTarefa)
  );
}

function carregarColunasSalvas() {
  const colunasSalvas = localStorage.getItem(COLUNAS_STORAGE_KEY);

  if (!colunasSalvas) return [];

  try {
    const colunas = JSON.parse(colunasSalvas);

    return Array.isArray(colunas) && colunas.every(isColuna) ? colunas : [];
  } catch {
    return [];
  }
}

export const Container = () => {
  const [colunas, setColunas] = useState<IColuna[]>(carregarColunasSalvas);
  const [colunaParaExcluir, setColunaParaExcluir] = useState<IColuna | null>(
    null,
  );
  const [tarefaParaExcluir, setTarefaParaExcluir] = useState<ITarefa | null>(
    null,
  );
  const [cronometro, setCronometro] = useState(false);
  const [idColunaCronometroAtivo, setIdColunaCronometroAtivo] = useState<
    string | null
  >(null);
  const [cronometrosPorTarefa, setCronometrosPorTarefa] = useState<
    Record<string, CronometroTarefa>
  >({});
  const [agora, setAgora] = useState(0);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const existeCronometroRodando = Object.values(cronometrosPorTarefa).some(
    (cronometroTarefa) => cronometroTarefa.rodando,
  );

  useEffect(() => {
    localStorage.setItem(COLUNAS_STORAGE_KEY, JSON.stringify(colunas));
  }, [colunas]);

  useEffect(() => {
    if (!existeCronometroRodando) return;

    const intervalId = window.setInterval(() => {
      setAgora(getTimestamp());
    }, 250);

    return () => window.clearInterval(intervalId);
  }, [existeCronometroRodando]);

  function toggleCronometroColuna(colunaId: string) {
    if (idColunaCronometroAtivo === colunaId) {
      setCronometro((cronometroAtual) => !cronometroAtual);
      return;
    }

    setIdColunaCronometroAtivo(colunaId);
    setCronometro(true);
  }

  function obterCronometroTarefa(tarefaId: string) {
    return (
      cronometrosPorTarefa[tarefaId] ?? {
        rodando: false,
        iniciadoEm: null,
        msAcumulados: 0,
      }
    );
  }

  function tarefaTemCronometroRegistrado(tarefaId: string) {
    return tarefaId in cronometrosPorTarefa;
  }

  function obterMsDecorridoTarefa(tarefaId: string) {
    const cronometroTarefa = obterCronometroTarefa(tarefaId);

    return (
      cronometroTarefa.msAcumulados +
      (cronometroTarefa.rodando && cronometroTarefa.iniciadoEm
        ? agora - cronometroTarefa.iniciadoEm
        : 0)
    );
  }

  function toggleCronometroTarefa(tarefaId: string) {
    const timestampAtual = getTimestamp();

    setCronometrosPorTarefa((cronometrosAtuais) => {
      const cronometroAtual =
        cronometrosAtuais[tarefaId] ??
        ({
          rodando: false,
          iniciadoEm: null,
          msAcumulados: 0,
        } satisfies CronometroTarefa);

      if (cronometroAtual.rodando) {
        return {
          ...cronometrosAtuais,
          [tarefaId]: {
            rodando: false,
            iniciadoEm: null,
            msAcumulados:
              cronometroAtual.msAcumulados +
              (timestampAtual - (cronometroAtual.iniciadoEm ?? timestampAtual)),
          },
        };
      }

      setAgora(timestampAtual);

      return {
        ...cronometrosAtuais,
        [tarefaId]: {
          ...cronometroAtual,
          rodando: true,
          iniciadoEm: timestampAtual,
        },
      };
    });
  }

  function reiniciarCronometroTarefa(tarefaId: string) {
    const timestampAtual = getTimestamp();

    setCronometrosPorTarefa((cronometrosAtuais) => {
      const cronometroAtual = cronometrosAtuais[tarefaId];

      if (!cronometroAtual) return cronometrosAtuais;

      setAgora(timestampAtual);

      return {
        ...cronometrosAtuais,
        [tarefaId]: {
          rodando: cronometroAtual.rodando,
          iniciadoEm: cronometroAtual.rodando ? timestampAtual : null,
          msAcumulados: 0,
        },
      };
    });
  }

  function sincronizarCronometroTarefaComColuna(
    tarefaId: string,
    colunaDestinoId: string,
  ) {
    const timestampAtual = getTimestamp();
    const colunaDestinoTemCronometroAtivo =
      cronometro && idColunaCronometroAtivo === colunaDestinoId;

    setCronometrosPorTarefa((cronometrosAtuais) => {
      const cronometroAtual =
        cronometrosAtuais[tarefaId] ??
        ({
          rodando: false,
          iniciadoEm: null,
          msAcumulados: 0,
        } satisfies CronometroTarefa);

      if (colunaDestinoTemCronometroAtivo) {
        if (cronometroAtual.rodando) return cronometrosAtuais;

        setAgora(timestampAtual);

        return {
          ...cronometrosAtuais,
          [tarefaId]: {
            ...cronometroAtual,
            rodando: true,
            iniciadoEm: timestampAtual,
          },
        };
      }

      if (!cronometroAtual.rodando) return cronometrosAtuais;

      return {
        ...cronometrosAtuais,
        [tarefaId]: {
          rodando: false,
          iniciadoEm: null,
          msAcumulados:
            cronometroAtual.msAcumulados +
            (timestampAtual - (cronometroAtual.iniciadoEm ?? timestampAtual)),
        },
      };
    });
  }

  function encontrarColunaPorTarefa(
    tarefaId: string,
    colunasAtuais: IColuna[],
  ) {
    return colunasAtuais.find((coluna) =>
      coluna.tarefas.some((tarefa) => tarefa.id === tarefaId),
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
    const novaTarefaId = crypto.randomUUID();
    const colunaTemCronometroAtivo =
      cronometro && idColunaCronometroAtivo === colunaId;

    setColunas((colunasAtuais) =>
      colunasAtuais.map((coluna) => {
        if (coluna.id !== colunaId) return coluna;

        return {
          ...coluna,
          tarefas: [
            ...coluna.tarefas,
            {
              id: novaTarefaId,
              descricao: "",
            },
          ],
        };
      }),
    );

    if (colunaTemCronometroAtivo) {
      const timestampAtual = getTimestamp();

      setAgora(timestampAtual);
      setCronometrosPorTarefa((cronometrosAtuais) => ({
        ...cronometrosAtuais,
        [novaTarefaId]: {
          rodando: true,
          iniciadoEm: timestampAtual,
          msAcumulados: 0,
        },
      }));
    }
  }

  function removerColuna(colunaId: string) {
    setColunas((colunasAtuais) =>
      colunasAtuais.filter((coluna) => coluna.id !== colunaId),
    );
  }

  function confirmarRemocaoColuna() {
    if (!colunaParaExcluir) return;

    removerColuna(colunaParaExcluir.id);
    setColunaParaExcluir(null);
  }

  function removerTarefa(tarefaId: string) {
    setColunas((colunasAtuais) =>
      colunasAtuais.map((coluna) => ({
        ...coluna,
        tarefas: coluna.tarefas.filter((tarefa) => tarefa.id !== tarefaId),
      })),
    );
    setCronometrosPorTarefa((cronometrosAtuais) => {
      const cronometrosRestantes = { ...cronometrosAtuais };

      delete cronometrosRestantes[tarefaId];
      return cronometrosRestantes;
    });
  }

  function confirmarRemocaoTarefa() {
    if (!tarefaParaExcluir) return;

    removerTarefa(tarefaParaExcluir.id);
    setTarefaParaExcluir(null);
  }

  function atualizarTarefa(tarefaId: string, descricao: string) {
    setColunas((colunasAtuais) =>
      colunasAtuais.map((coluna) => ({
        ...coluna,
        tarefas: coluna.tarefas.map((tarefa) =>
          tarefa.id === tarefaId ? { ...tarefa, descricao } : tarefa,
        ),
      })),
    );
  }

  function atualizarTituloColuna(colunaId: string, texto: string) {
    setColunas((colunasAtuais) =>
      colunasAtuais.map((coluna) =>
        coluna.id === colunaId ? { ...coluna, texto } : coluna,
      ),
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
      (tarefa) => tarefa.id !== tarefaMovida.id,
    );
    const tarefasDestino = [...colunaDestino.tarefas];
    const tarefaDestinoIndex = tarefasDestino.findIndex(
      (tarefa) => tarefa.id === overId,
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
        (tarefa) => tarefa.id === activeId,
      );

      if (!tarefaMovida) return colunasAtuais;

      sincronizarCronometroTarefaComColuna(
        tarefaMovida.id,
        colunaDestino.id,
      );

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
        (tarefa) => tarefa.id === activeId,
      );
      const overColumnId = colunaDestino.id === overId;
      const newIndex = overColumnId
        ? colunaOrigem.tarefas.length - 1
        : colunaOrigem.tarefas.findIndex((tarefa) => tarefa.id === overId);

      if (oldIndex < 0 || newIndex < 0) return colunasAtuais;

      return colunasAtuais.map((coluna) =>
        coluna.id === colunaOrigem.id
          ? {
              ...coluna,
              tarefas: arrayMove(coluna.tarefas, oldIndex, newIndex),
            }
          : coluna,
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
            cronometro={cronometro}
            colunaComCronometroAtivo={idColunaCronometroAtivo === coluna.id}
            obterMsDecorridoTarefa={obterMsDecorridoTarefa}
            obterCronometroTarefa={obterCronometroTarefa}
            tarefaTemCronometroRegistrado={tarefaTemCronometroRegistrado}
            onToggleCronometroTarefa={toggleCronometroTarefa}
            onReiniciarCronometroTarefa={reiniciarCronometroTarefa}
            onToggleCronometro={() => toggleCronometroColuna(coluna.id)}
            onAdicionarTarefa={adicionarTarefa}
            onAtualizarTarefa={atualizarTarefa}
            onAtualizarTitulo={atualizarTituloColuna}
            onRemoverColuna={removerColuna}
            onSolicitarRemocaoColuna={setColunaParaExcluir}
            onRemoverTarefa={removerTarefa}
            onSolicitarRemocaoTarefa={setTarefaParaExcluir}
          />
        ))}
        <Button
          onClick={() => adicionarColuna()}
          text="Adicionar Coluna"
          icone={<IconeAdd />}
          style={{ height: "fit-content", backgroundColor: "#3665e4" }}
        />
      </S._Container>
      {colunaParaExcluir && (
        <ConfirmModal
          title="Excluir coluna?"
          description={`A coluna "${
            colunaParaExcluir.texto.toUpperCase() || "Sem titulo"
          }" e suas tarefas serao removidas.`}
          confirmText="Excluir"
          cancelText="Cancelar"
          onConfirm={confirmarRemocaoColuna}
          onCancel={() => setColunaParaExcluir(null)}
        />
      )}
      {tarefaParaExcluir && (
        <ConfirmModal
          title="Excluir tarefa?"
          description={`A tarefa "${
            tarefaParaExcluir.descricao.trim() || "Sem descricao"
          }" sera removida.`}
          confirmText="Excluir"
          cancelText="Cancelar"
          onConfirm={confirmarRemocaoTarefa}
          onCancel={() => setTarefaParaExcluir(null)}
        />
      )}
    </DndContext>
  );
};
