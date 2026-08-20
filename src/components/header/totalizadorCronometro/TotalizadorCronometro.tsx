import IconeSchedule from "../../../assets/IconeSchedule.svg?react";
import * as S from "./styles";

interface ITotalizadorCronometroProps {
  msTotal: number;
}

function formatarTempo(msTotal: number) {
  const totalSeconds = Math.floor(msTotal / 1000);
  const horas = Math.floor(totalSeconds / 3600);
  const minutos = Math.floor((totalSeconds % 3600) / 60);
  const segundos = totalSeconds % 60;

  return `${String(horas).padStart(2, "0")}:${String(minutos).padStart(
    2,
    "0",
  )}:${String(segundos).padStart(2, "0")}`;
}

export const TotalizadorCronometro = ({
  msTotal,
}: ITotalizadorCronometroProps) => {
  return (
    <S._Totalizador>
      <IconeSchedule />
      Tempo total cronometrado: {formatarTempo(msTotal)}
    </S._Totalizador>
  );
};
