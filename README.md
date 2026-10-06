# FocalDayTrack

Quadro Kanban para organizar tarefas e acompanhar o tempo dedicado a elas. As colunas definem as etapas do fluxo de trabalho e os cards representam as tarefas.

## Usar o quadro

1. Crie colunas como **Backlog**, **A fazer**, **Em andamento** e **Concluído**.
2. Adicione cards com as tarefas em cada coluna.
3. Arraste os cards entre colunas para atualizar sua etapa ou dentro da mesma coluna para ordenar as tarefas.
4. Arraste o ícone de menu no canto superior esquerdo da coluna para mudar sua posição.
5. Ative o cronômetro da coluna de trabalho para cronometrar tarefas criadas nela ou movidas para ela.

Os nomes das colunas são livres. O aplicativo não exige etapas predefinidas nem aplica regras especiais a uma coluna chamada "Concluído".

## Funcionalidades

- Criação e edição de colunas e tarefas, com campos de altura ajustável.
- Remoção de itens vazios ao perder o foco ou pressionar Enter.
- Exclusão de colunas e tarefas com confirmação.
- Drag and drop de colunas e cards.
- Cronômetros por tarefa e totalizador sem duplicar períodos simultâneos.
- Persistência local do quadro, cronômetros e preferências.
- Alternância entre tema claro e escuro.

## Executar localmente

Com Node.js e npm instalados, execute na raiz do projeto:

```sh
npm install
npm run dev
```

Abra o endereço informado pelo Vite no terminal.

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Verifica o TypeScript e gera a aplicação em `dist/`. |
| `npm run preview` | Serve a versão gerada pelo build localmente. |
| `npm run lint` | Verifica o código com ESLint. |
| `npm run lint:fix` | Aplica as correções automáticas disponíveis. |

## Tecnologias

React, TypeScript, Vite, styled-components e @dnd-kit. O projeto também utiliza ESLint, React Compiler e vite-plugin-svgr para importar SVGs como componentes React.

## Documentação

- [Guia de uso e organização do projeto](docs/guia-do-projeto.md): conceitos do Kanban, operações, cronômetros, armazenamento e estrutura do código.
- [Registro da implementação de drag and drop](docs/drag-and-drop-tarefas.md): documento anterior sobre o movimento de tarefas. Alguns trechos retratam uma versão anterior; consulte o guia para a estrutura atual.

## Armazenamento

Os dados ficam no `localStorage` do navegador. Não há backend nem sincronização entre dispositivos. Limpar os dados do site remove os registros locais; outro navegador ou outro endereço da aplicação possui armazenamento separado.
