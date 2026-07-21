import * as S from "./styles";
import IconeTimer from "../../../assets/iconeTimer.svg?react";
import IconeDelete from "../../../assets/iconeDelete.svg?react";
import { Button } from "../../Button/Button";
import { useEffect, useRef, useState } from "react";

interface IColunaProps {
  text?: string;
}

export const Coluna = (props: IColunaProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [texto, setTexto] = useState(props.text);

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
      <Button text="Adicionar Tarefa" />
    </S._Coluna>
  );
};
