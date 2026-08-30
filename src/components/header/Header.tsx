import * as S from "./styles";
import { TotalizadorCronometro } from "./totalizadorCronometro/TotalizadorCronometro";

interface IHeaderProps {
  totalCronometrado: number;
  temaEscuro: boolean;
  onToggleTema: () => void;
}

export const Header = ({
  totalCronometrado,
  temaEscuro,
  onToggleTema,
}: IHeaderProps) => {
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
      <S._HeaderActions>
        <S._ThemeControl>
          <S._ThemeLabel>Dark theme</S._ThemeLabel>
          <S._ThemeToggle
            type="button"
            aria-label={temaEscuro ? "Ativar tema claro" : "Ativar tema escuro"}
            aria-pressed={temaEscuro}
            onClick={onToggleTema}
            $ativo={temaEscuro}
          >
            <S._ThemeToggleThumb />
          </S._ThemeToggle>
        </S._ThemeControl>
        <TotalizadorCronometro msTotal={totalCronometrado} />
      </S._HeaderActions>
    </S._Header>
  );
};
