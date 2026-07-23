# Drag and Drop de Tarefas

Este documento descreve como foi implementado o drag and drop das tarefas entre colunas e a reordenacao dentro da mesma coluna.

## Objetivo

Permitir que uma tarefa possa:

- ser arrastada de uma coluna para outra;
- ser reordenada dentro da mesma coluna;
- manter sua descricao ao ser movida;
- funcionar tambem quando a coluna de destino estiver vazia.

## Biblioteca Utilizada

A implementacao usa o `@dnd-kit`, dividido principalmente em:

- `@dnd-kit/core`: contexto geral do drag and drop, sensores e eventos.
- `@dnd-kit/sortable`: ordenacao de itens dentro das listas.
- `@dnd-kit/utilities`: conversao de transformacoes para CSS.

## Estrutura de Estado

Para permitir mover tarefas entre colunas, o estado das tarefas foi centralizado no componente `Container`.

Antes, cada `Coluna` tinha seu proprio estado de tarefas. Isso dificulta mover uma tarefa para outra coluna, porque uma coluna nao tem controle direto sobre o estado da outra.

Agora, o estado segue esta estrutura:

```ts
export interface ITarefa {
  id: string;
  descricao: string;
}

export interface IColuna {
  id: string;
  texto: string;
  tarefas: ITarefa[];
}
```

O `Container` guarda:

```ts
const [colunas, setColunas] = useState<IColuna[]>([]);
```

Assim, ele consegue adicionar colunas, adicionar tarefas, atualizar descricoes, atualizar titulos e mover tarefas.

## Papel de Cada Componente

### Container

Arquivo: `src/components/container/Container.tsx`

Responsabilidades:

- guardar o estado principal de colunas e tarefas;
- configurar o `DndContext`;
- criar os sensores do drag;
- decidir o que acontece durante `onDragOver`;
- decidir o que acontece ao finalizar `onDragEnd`;
- passar dados e callbacks para cada `Coluna`.

O `DndContext` envolve a area das colunas:

```tsx
<DndContext
  sensors={sensors}
  collisionDetection={closestCorners}
  onDragOver={handleDragOver}
  onDragEnd={handleDragEnd}
>
  ...
</DndContext>
```

### Coluna

Arquivo: `src/components/container/coluna/Coluna.tsx`

Responsabilidades:

- renderizar titulo da coluna;
- renderizar lista de tarefas;
- funcionar como area onde tarefas podem ser soltas;
- configurar o `SortableContext` para suas tarefas.

A coluna usa `useDroppable`:

```ts
const { setNodeRef } = useDroppable({ id: coluna.id });
```

Isso permite que uma tarefa seja solta na propria coluna, inclusive quando ela estiver vazia.

As tarefas da coluna ficam dentro de um `SortableContext`:

```tsx
<SortableContext
  items={coluna.tarefas.map((tarefa) => tarefa.id)}
  strategy={verticalListSortingStrategy}
>
  ...
</SortableContext>
```

### Tarefa

Arquivo: `src/components/container/coluna/tarefa/Tarefa.tsx`

Responsabilidades:

- renderizar o card da tarefa;
- tornar o card arrastavel com `useSortable`;
- manter o textarea controlado pelo estado do `Container`;
- recalcular a altura do textarea quando o texto muda.

A tarefa usa:

```ts
const {
  attributes,
  listeners,
  setNodeRef,
  transform,
  transition,
  isDragging,
} = useSortable({ id });
```

O `setNodeRef` conecta o card ao `@dnd-kit`, e `transform`/`transition` aplicam o movimento visual.

## Fluxo do Drag and Drop

### 1. Inicio do Drag

Quando o usuario arrasta uma tarefa, o `@dnd-kit` identifica o item ativo por `active.id`.

Esse `id` corresponde ao `id` da tarefa.

### 2. Durante o Drag Entre Colunas

O movimento entre colunas acontece em `handleDragOver`.

Esse ponto foi importante porque mover entre colunas apenas em `onDragEnd` causava comportamento instavel: o card podia parecer sumir ou nao entrar corretamente na coluna de destino.

No `handleDragOver`, o codigo:

- pega o `activeId`, que e a tarefa arrastada;
- pega o `overId`, que e o item ou coluna abaixo do cursor;
- encontra a coluna de origem;
- encontra a coluna de destino;
- se a origem e o destino forem diferentes, move a tarefa imediatamente para a nova coluna.

### 3. Final do Drag na Mesma Coluna

A reordenacao dentro da mesma coluna acontece em `handleDragEnd`.

Quando a origem e o destino sao a mesma coluna, o codigo calcula:

- `oldIndex`: posicao antiga da tarefa;
- `newIndex`: nova posicao da tarefa.

Depois usa:

```ts
arrayMove(coluna.tarefas, oldIndex, newIndex)
```

Isso evita problemas ao arrastar uma tarefa para baixo, porque o `arrayMove` trata corretamente a remocao e reinsercao do item.

### 4. Soltar no Espaco Vazio da Coluna

Quando o usuario solta uma tarefa no espaco vazio de uma coluna, o `overId` pode ser o `id` da propria coluna.

Nesse caso, a tarefa e enviada para o final da lista:

```ts
const overColumnId = colunaDestino.id === overId;
const newIndex = overColumnId
  ? colunaOrigem.tarefas.length - 1
  : colunaOrigem.tarefas.findIndex((tarefa) => tarefa.id === overId);
```

## Por Que o Estado Ficou no Container

O estado precisa ficar no `Container` porque o drag and drop envolve mais de uma coluna.

Se cada `Coluna` tivesse seu proprio `useState` de tarefas, mover uma tarefa entre colunas exigiria sincronizar estados separados. Centralizando no `Container`, a operacao vira apenas uma atualizacao de um array de colunas.

Esse desenho tambem facilita proximas funcionalidades:

- excluir tarefa;
- excluir coluna;
- salvar no `localStorage`;
- enviar para uma API;
- persistir ordem das tarefas;
- persistir coluna atual de cada tarefa.

## Ajuste do Textarea

O card da tarefa usa um `textarea` que cresce conforme o texto.

Como uma tarefa pode ser movida de uma coluna para outra, a altura precisa ser recalculada quando a descricao renderiza novamente. Por isso existe um `useEffect` baseado em `descricao`:

```ts
useEffect(() => {
  if (!inputRef.current) return;

  ajustarAltura(inputRef.current);
}, [descricao]);
```

Sem isso, ao arrastar uma tarefa com texto grande para outra coluna, o textarea poderia voltar para a altura inicial e mostrar scroll interno.

## Pontos de Atencao

- Os `id`s de colunas e tarefas precisam ser estaveis. Por isso foi usado `crypto.randomUUID()`.
- O `PointerSensor` usa `distance: 8` para evitar iniciar drag em qualquer pequeno clique.
- O `textarea` e controlado pelo estado do `Container`, nao por estado local da tarefa.
- Colunas tem largura fixa e `flex-shrink: 0` para evitar que o layout se comprima durante o drag.

## Arquivos Envolvidos

- `src/interfaces/Interfaces.ts`
- `src/components/container/Container.tsx`
- `src/components/container/coluna/Coluna.tsx`
- `src/components/container/coluna/tarefa/Tarefa.tsx`
- `src/components/container/coluna/styles.ts`
- `src/components/container/coluna/tarefa/styles.ts`
