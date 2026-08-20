import { useState } from "react";
import { Container } from "./components/container/Container";
import { Header } from "./components/header/Header";
import * as S from "./App.styles";

function App() {
  const [totalCronometrado, setTotalCronometrado] = useState(0);

  return (
    <S._Page>
      <Header totalCronometrado={totalCronometrado} />
      <Container onAtualizarTotalCronometrado={setTotalCronometrado} />
    </S._Page>
  );
}

export default App;
