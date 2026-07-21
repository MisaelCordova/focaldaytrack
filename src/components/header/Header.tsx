import * as S from "./styles";

export const Header = () => {
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
  return <S._Header>
    <S._TextoData>{data}</S._TextoData>
    <S._TextoSaudacao>{Saudacao()}. Foque no Essencial</S._TextoSaudacao>
    </S._Header>;
};
