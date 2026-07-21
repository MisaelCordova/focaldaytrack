import { Container } from "./components/container/Container";
import { Header } from "./components/header/Header";
import * as S from "./App.styles";

function App() {
  return (
    <S._Page>
      <Header />
      <Container/>
    </S._Page>
  );
}

export default App;
