import { useState } from "react";
import { Button } from "../Button/Button";
import { Coluna } from "./coluna/Coluna";

import * as S from "./styles";

export const Container = () => {
  const [colunas, setColunas] = useState<string[]>([]);

  function adicionarColuna() {
    setColunas((colunasAtuais) => [
      ...colunasAtuais,
      "",
      
    ]);
  }

  return (
    <S._Container>
      {colunas && colunas.map((coluna) => (
        <Coluna key={coluna} text={coluna} />
      ))}
      <Button onClick={() => adicionarColuna()} text="Adicionar Coluna" style={{ height: "fit-content" }} />
    </S._Container>
  );
};
