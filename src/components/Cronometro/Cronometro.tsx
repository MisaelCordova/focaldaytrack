import * as S from "./styles";
import IconePlayArrow from "../../assets/iconePlayArrow.svg?react";
import IconePauseArrow from "../../assets/iconePauseArrow.svg?react";
import IconeRefresh from "../../assets/iconeRefresh.svg?react";
import { Button } from "../button/Button";

interface ICronometroProps {
  colunaComCronometroAtivo: boolean;
  msDecorrido: number;
  rodando: boolean;
  onToggle: () => void;
  onReiniciar: () => void;
}

export const Cronometro = ({
  colunaComCronometroAtivo,
  msDecorrido,
  rodando,
  onToggle,
  onReiniciar,
}: ICronometroProps) => {
  const totalSeconds = Math.floor(msDecorrido / 1000);
  const horas = Math.floor(totalSeconds / 3600);
  const minutos = Math.floor((totalSeconds % 3600) / 60);
  const segundos = totalSeconds % 60;

  return (
    <S._Cronometro>
      {String(horas).padStart(2, "0")}:{String(minutos).padStart(2, "0")}:
      {String(segundos).padStart(2, "0")}
      <div>
        {colunaComCronometroAtivo && (
          <>
            {rodando ? (
              <Button
                style={{ boxShadow: "none", padding: 0 }}
                onClick={onToggle}
                icone={<IconePauseArrow />}
              />
            ) : (
              <Button
                style={{ boxShadow: "none", padding: 0 }}
                onClick={onToggle}
                icone={<IconePlayArrow />}
              />
            )}
            <Button
              style={{ boxShadow: "none", padding: 0 }}
              onClick={onReiniciar}
              icone={<IconeRefresh />}
            />
          </>
        )}
      </div>
    </S._Cronometro>
  );
};
