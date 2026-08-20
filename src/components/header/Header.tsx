import * as S from "./styles";
import { TotalizadorCronometro } from "./totalizadorCronometro/TotalizadorCronometro";

interface IHeaderProps {
  totalCronometrado: number;
}

export const Header = ({ totalCronometrado }: IHeaderProps) => {
  const data = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const Saudacao = () => {
    const h = new Date().getHours();

    if (h < 12) return "Bom dia";
    if (h < 18) return "Boa tarde";
    return "Boa noite";
  };
  return (
    <S._Header>
      <S._TextoHeader>
        <S._TextoData>{data}</S._TextoData>
        <S._TextoSaudacao>{Saudacao()}. Foque no Essencial</S._TextoSaudacao>
        <p>
          Se você é freelancer e não esta se sentindo tão produtivo esse projeto
          é para você
        </p>
      </S._TextoHeader>
      <TotalizadorCronometro msTotal={totalCronometrado} />
    </S._Header>
  );
};
