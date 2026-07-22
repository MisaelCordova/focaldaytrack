import { useState } from "react";
import { Button } from "../Button/Button";
import { Coluna } from "./coluna/Coluna";

import * as S from "./styles";

interface IColuna {
  id: number;
  texto: string;
}

export const Container = () => {
  const [colunas, setColunas] = useState<IColuna[]>([]);

  function adicionarColuna() {
    setColunas((colunasAtuais) => [
      ...colunasAtuais,
    {
      id: colunas.length + 1,
      texto: ""
    },
      
    ]);
  }

  return (
    <S._Container>
      {colunas && colunas.map((coluna) => (
        <Coluna key={coluna.id} text={coluna.texto} />
      ))}
      <Button onClick={() => adicionarColuna()} text="Adicionar Coluna" style={{ height: "fit-content" }} />
    </S._Container>
  );
};
