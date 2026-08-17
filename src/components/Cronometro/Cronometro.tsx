import * as S from "./styles";
import IconePlayArrow from "../../assets/iconePlayArrow.svg?react";
import IconePauseArrow from "../../assets/iconePauseArrow.svg?react";
import IconeRefresh from "../../assets/iconeRefresh.svg?react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../Button/Button";

export const Cronometro = ({
  colunaComCronometroAtivo,
}: {
  colunaComCronometroAtivo: boolean;
}) => {
  const [rodando, setRodando] = useState<boolean>(false);
  const [msDecorrido, setMsDecorrido] = useState(0);
  const horarioInicioRef = useRef<number | null>(null);
  const msAcumulados = useRef(0);

  useEffect(() => {
    if (!rodando) return;

    horarioInicioRef.current = Date.now();

    const intervalId = window.setInterval(() => {
      if (!horarioInicioRef.current) return;
      const tempoAtualDecorrido =
        msAcumulados.current + (Date.now() - horarioInicioRef.current);
      setMsDecorrido(tempoAtualDecorrido);
    }, 250);
    return () => {
      window.clearInterval(intervalId);
      if (horarioInicioRef.current) {
        msAcumulados.current += Date.now() - horarioInicioRef.current;
        horarioInicioRef.current = null;
      }
    };
  }, [rodando]);

  const reiniciar = () => {
    setRodando(false);
    setMsDecorrido(0);
    msAcumulados.current = 0;
    horarioInicioRef.current = null;
  };

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
            {" "}
            {rodando ? (
              <Button
                style={{ boxShadow: "none", padding: 0 }}
                onClick={() => setRodando(false)}
                icone={<IconePauseArrow />}
              />
            ) : (
              <Button
                style={{ boxShadow: "none", padding: 0 }}
                onClick={() => setRodando(true)}
                icone={<IconePlayArrow />}
              />
            )}
            <Button
              style={{ boxShadow: "none", padding: 0 }}
              onClick={reiniciar}
              icone={<IconeRefresh />}
            />
          </>
        )}
      </div>
    </S._Cronometro>
  );
};
