import { useEffect, useRef, useState } from "react";
import * as S from "./styles";
import type { ITarefa } from "../../../../interfaces/Interfaces";

export const Tarefa = ({ id, descricao }: ITarefa) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [descricaoTarefa, setDescricaoTarefa] = useState<string>(descricao);

  function autoResize(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const textarea = event.target;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <S._CardTarefa>
      <S._Texto
        id={`tarefa-${id}-descricao`}
        name={`tarefas.${id}.descricao`}
        aria-label="Descricao da tarefa"
        ref={inputRef}
        rows={1}
        value={descricaoTarefa}
        onChange={(e) => {
          setDescricaoTarefa(e.target.value);
          autoResize(e);
        }}
      />
    </S._CardTarefa>
  );
};
