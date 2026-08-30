import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { Container } from "./components/container/Container";
import { Header } from "./components/header/Header";
import * as S from "./App.styles";
import { darkTheme, lightTheme } from "./utils/theme";

const THEME_STORAGE_KEY = "@FocalDayTrack:theme";

function carregarTemaSalvo() {
  return localStorage.getItem(THEME_STORAGE_KEY) === "dark";
}

function App() {
  const [totalCronometrado, setTotalCronometrado] = useState(0);
  const [temaEscuro, setTemaEscuro] = useState(carregarTemaSalvo);

  function toggleTema() {
    setTemaEscuro((temaEscuroAtual) => {
      const novoTemaEscuro = !temaEscuroAtual;

      localStorage.setItem(
        THEME_STORAGE_KEY,
        novoTemaEscuro ? "dark" : "light",
      );

      return novoTemaEscuro;
    });
  }

  return (
    <ThemeProvider theme={temaEscuro ? darkTheme : lightTheme}>
      <S._Page>
        <Header
          totalCronometrado={totalCronometrado}
          temaEscuro={temaEscuro}
          onToggleTema={toggleTema}
        />
        <Container onAtualizarTotalCronometrado={setTotalCronometrado} />
      </S._Page>
    </ThemeProvider>
  );
}

export default App;
