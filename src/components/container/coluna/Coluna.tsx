import * as S from "./styles";
import IconeTimer from "../../../assets/iconeTimer.svg?react";
import IconeDelete from "../../../assets/iconeDelete.svg?react";
import { Button } from "../../Button/Button";
import { useEffect, useRef, useState } from "react";
import { Tarefa } from "./tarefa/Tarefa";
import type { ITarefa } from "../../../interfaces/Interfaces";

interface IColunaProps {
  text?: string;
}


export const Coluna = (props: IColunaProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [texto, setTexto] = useState(props.text);
  const [terefas, setTarefas] = useState<ITarefa[]>([]);

  function adicionarTarefa() {
 
    setTarefas((colunasAtuais) => [
      ...colunasAtuais,
      {
        id: terefas.length + 1,
        descricao: "",
      },
    ]);
  }
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <S._Coluna>
      <S._HeaderColuna>
        <S._Titulo
          ref={inputRef}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        ></S._Titulo>
        <IconeTimer />
        <IconeDelete />
      </S._HeaderColuna>
      {terefas &&
        terefas.map((tarefa) => (
          <Tarefa key={tarefa.id} {...tarefa} />
        ))}
      <Button text="Adicionar tarefa" onClick={() => adicionarTarefa()} />
    </S._Coluna>
  );
};
