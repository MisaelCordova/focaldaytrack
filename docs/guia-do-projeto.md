# Guia do FocalDayTrack

## Objetivo e conceitos

O FocalDayTrack organiza tarefas em um quadro Kanban e acompanha o tempo cronometrado. Cada coluna representa um campo ou etapa do fluxo e cada card representa uma tarefa. Mover um card muda a etapa em que a tarefa está.

Neste projeto, "campo do Kanban" significa uma coluna do quadro, e não um atributo adicional do card. Atualmente, uma tarefa possui identificador e descrição; não existem campos separados de responsável, prazo, etiqueta ou prioridade.

## Organizar o Kanban

| Coluna sugerida | Finalidade | Exemplo de tarefa |
| --- | --- | --- |
| Backlog | Demandas ainda não selecionadas para execução. | Investigar melhorias na tela inicial. |
| A fazer | Tarefas prontas para serem iniciadas. | Criar formulário de cadastro. |
| Em andamento | Tarefas em execução. | Implementar validação do formulário. |
| Concluído | Tarefas finalizadas. | Corrigir alinhamento do cabeçalho. |

Esses nomes são sugestões de uso. As colunas podem representar outro fluxo, como "Planejamento", "Desenvolvimento", "Revisão" e "Entrega". Nenhum nome possui comportamento especial.

A posição dos cards pode indicar a ordem de execução por convenção do usuário. O aplicativo não calcula prioridades nem limita a quantidade de tarefas em andamento.

## Colunas

Clique em **Adicionar Coluna** e digite o título no campo que recebe foco. O título pode ser editado diretamente e sua altura se ajusta quando o texto não cabe em uma linha. Enter encerra a edição.

Se o título estiver vazio ou contiver apenas espaços, Enter ou a perda de foco remove a coluna sem confirmação. Isso também vale ao apagar o título de uma coluna existente: seus cards deixam de aparecer no quadro.

Arraste o ícone de menu no canto superior esquerdo para mudar a ordem das colunas. A ordem resultante é salva localmente.

O botão de exclusão abre um modal. Confirmar remove a coluna e seus cards; cancelar ou clicar fora do modal fecha a confirmação. Não existe uma ação de desfazer exclusão.

## Cards de tarefas

Clique em **Adicionar tarefa** na coluna desejada e escreva a descrição. O campo começa com uma linha e cresce conforme o conteúdo.

- Enter encerra a edição.
- Shift + Enter insere uma quebra de linha na descrição.
- Enter ou a perda de foco remove um card vazio ou com apenas espaços, inclusive durante a edição de um card existente.

As alterações de texto atualizam o quadro e são persistidas automaticamente, sem um botão de salvar.

Arraste um card para outra coluna para mudar sua etapa. Também é possível posicioná-lo acima ou abaixo de outros cards na mesma coluna, ou movê-lo para uma coluna vazia.

O botão de exclusão aparece ao passar o ponteiro sobre o card ou quando ele contém o foco. A exclusão exige confirmação e remove também o registro de cronômetro dessa tarefa.

## Cronômetros

### Ativação por coluna, contagem por tarefa

O botão de cronômetro no cabeçalho da coluna define onde os controles de tempo ficam disponíveis. Seu tooltip mostra **Ativar** quando inativo e **Inativar** quando ativo.

Apenas uma coluna pode ter essa ativação por vez. Ativar outra coluna transfere a ativação; clicar novamente na mesma coluna alterna entre ativo e inativo. A escolha é salva no navegador.

O tempo pertence à tarefa, identificado pelo seu `id`, e não à coluna. Mudar a tarefa de coluna preserva os intervalos já cronometrados.

| Ação | Resultado atual |
| --- | --- |
| Criar tarefa na coluna ativa | Registra e inicia o cronômetro da nova tarefa. |
| Mover tarefa para a coluna ativa | Inicia ou retoma a contagem automaticamente. |
| Mover tarefa para uma coluna inativa | Pausa uma contagem em andamento e preserva o tempo. |
| Reordenar tarefa na mesma coluna | Mantém o estado do cronômetro. |
| Usar play ou pause | Alterna a contagem da tarefa. |
| Reiniciar | Apaga os intervalos; se estava rodando, começa uma nova contagem. |
| Inativar a coluna ou ativar outra | Oculta os controles anteriores, mas não pausa automaticamente suas tarefas. |

Ativar uma coluna não registra nem inicia, por si só, cronômetros de tarefas que já estavam nela. O registro acontece ao criar uma tarefa nessa coluna ou ao mover uma tarefa para ela.

Uma tarefa sem registro não mostra o componente de tempo. Depois que o registro existe, o tempo continua visível em outras colunas, mas play, pause e reiniciar só aparecem na coluna atualmente ativa.

### Totalizador

O cabeçalho apresenta a duração da união dos intervalos de todas as tarefas registradas. Períodos sobrepostos contam uma única vez.

Exemplo: a tarefa A roda das 10:00 às 10:10 e a tarefa B das 10:05 às 10:15. Cada tarefa mostra 10 minutos, mas o totalizador mostra **15 minutos**, correspondentes ao período das 10:00 às 10:15.

O cálculo usa timestamps de `Date.now()`. Um intervalo de atualização de 250 ms atualiza a exibição; o tempo não depende da quantidade de chamadas desse intervalo. Uma tarefa salva como rodando inclui o tempo transcorrido com a página fechada ao ser carregada novamente.

O total não é separado por dia. Reiniciar ou excluir uma tarefa remove seus intervalos do cálculo e pode reduzir o totalizador.

## Persistência e preferências

O aplicativo utiliza `localStorage`, sem API ou banco de dados remoto.

| Chave | Conteudo |
| --- | --- |
| `@FocalDayTrack:colunas` | Colunas, títulos, tarefas, descrições e ordem dos itens. |
| `@FocalDayTrack:cronometrosPorTarefa` | Estado de execução, início atual e intervalos encerrados por tarefa. |
| `@FocalDayTrack:cronometroColuna` | Ativação e identificador da coluna selecionada. |
| `@FocalDayTrack:theme` | Preferência `light` ou `dark`. |

O switch **Dark theme**, acima do totalizador, alterna os temas e salva a preferência.

Os dados são específicos do navegador e da origem da aplicação, incluindo protocolo, host e porta. Não são compartilhados automaticamente com outro dispositivo, perfil de navegador ou endereço. Limpar os dados do site remove os registros. Não há exportação, importação ou backup pela interface.

## Organização técnica

| Arquivo ou diretório | Responsabilidade |
| --- | --- |
| `src/App.tsx` | Tema e integração entre quadro e totalizador. |
| `src/components/header/` | Data, saudação, switch de tema e totalizador. |
| `src/components/container/Container.tsx` | Estado do quadro, persistência, cronômetros, totalização e eventos de drag and drop. |
| `src/components/container/coluna/Coluna.tsx` | Título, arraste da coluna, ativação de cronômetro e lista de tarefas. |
| `src/components/container/coluna/tarefa/Tarefa.tsx` | Card, descrição ajustável, arraste, exclusão e exibição do tempo. |
| `src/components/cronometro/` | Exibição de horas, minutos e segundos e controles da tarefa. |
| `src/components/confirmModal/` | Confirmação de exclusão reutilizável. |
| `src/components/button/` | Botão reutilizável. |
| `src/interfaces/Interfaces.ts` | Contratos de dados de tarefas, colunas e ativação de cronômetro. |
| `src/utils/theme.ts` | Tokens dos temas claro e escuro. |
| `src/styles/styled.d.ts` | Tipagem do tema do styled-components. |
| `src/index.css` | Estilos globais e reset. |

### Modelo de dados

```ts
interface ITarefa {
  id: string;
  descricao: string;
}

interface IColuna {
  id: string;
  texto: string;
  tarefas: ITarefa[];
}
```

Os identificadores são criados com `crypto.randomUUID()`. Os cronômetros ficam em um registro separado, indexado pelo identificador da tarefa. Colunas e tarefas recebem dados e callbacks do `Container`, que centraliza operações envolvendo mais de uma coluna.

### Drag and drop

O `DndContext` usa `PointerSensor` com distância mínima de 8 pixels e detecção `closestCorners`. Colunas usam `useSortable` e ordenação horizontal; tarefas usam `useSortable` e ordenação vertical.

O campo `data.tipo` distingue colunas de tarefas. `handleDragOver` transfere tarefas entre colunas e sincroniza a contagem com o destino durante o arraste. `handleDragEnd` reordena colunas ou tarefas na mesma coluna com `arrayMove`.

O [registro anterior de drag and drop](drag-and-drop-tarefas.md) documenta a evolução inicial. Seu exemplo de coluna com `useDroppable` foi substituído pelo `useSortable` na implementação atual.

## Limites atuais relevantes

- A ativação de uma coluna controla a disponibilidade dos botões; não equivale a pausar todas as tarefas dessa coluna.
- Excluir uma coluna remove seus cards, mas atualmente não limpa os registros de cronômetro dessas tarefas nem a seleção da coluna ativa. Esses registros podem continuar afetando o totalizador.
- A transferência entre colunas acontece durante o arraste. Não há restauração explícita da origem ao cancelar o gesto.
- Não existem usuários, colaboração em tempo real, sincronização remota ou histórico de exclusões.

## Desenvolvimento

Consulte o [README](../README.md) para instalar dependências e executar os comandos disponíveis. `npm run build` verifica a tipagem e gera o bundle; `npm run lint` verifica as regras de código. Atualmente não há script de testes automatizados no `package.json`.
