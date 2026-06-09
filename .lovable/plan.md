# Rede Arcanjo — Protótipo Hackathon

Protótipo interativo single-page com Role Switcher fixo trocando entre 4 visões. Dados 100% mockados/local — sem backend para o pitch.

## Design System

Atualizar `src/styles.css`:

- Tokens: `--background #F8F9FA`, `--foreground #1E3A5F` (Deep Ocean Blue), `--accent #FFC83B` (Sun Gold), mais cores de status (alto/médio/aprovado risco).
- Converter hex → OKLCH para tokens; registrar em `@theme inline`.
- Carregar Plus Jakarta Sans + Inter via `<link>` no head de `__root.tsx`; registrar `--font-display` / `--font-sans` em `@theme`.

Instalar: `framer-motion`, `canvas-confetti` (celebração do QR scan).

## Arquitetura

Single route `src/routes/index.tsx` renderiza todo o protótipo. State `activeView` alterna entre 4 views com `AnimatePresence` (fade/slide).

```
src/routes/index.tsx
src/components/RoleSwitcher.tsx
src/components/views/GuardiaoLarView.tsx
src/components/views/GuardiaoTecnicoView.tsx
src/components/views/AnjoSemAsaView.tsx
src/components/views/EscadaDeJacoView.tsx
src/components/SignalRiskModal.tsx
src/components/LastMileMap.tsx
src/components/QRScanModal.tsx
src/lib/mock-data.ts
```

## View 1 — Guardião do Lar (mobile-first)

- Header com logo + "Olá, Dona Maria. Vamos proteger o seu lar hoje?"
- Card CTA gigante (Deep Blue) com ícone `Camera` dourado: "Sinalizar Risco no Meu Lar". Abre `SignalRiskModal`:
  - Passo 1: viewfinder de câmera simulada (superfície escura, cantos de enquadramento, botão obturador). Clique "captura" uma foto placeholder de trinca.
  - Passo 2: formulário com `Localização` pré-preenchido "Ibura, Recife - PE" + `Descrição` textarea + botão Enviar.
- Card de status com timeline vertical de 3 nós:
  1. Chamado Enviado (check verde)
  2. Análise Técnica — ponto dourado pulsante + "Lucas Eng. está analisando"
  3. Chegada de Materiais (cinza pendente)
- Quando a view Anjo completa "Validar no Topo", um 4º nó "Materiais Entregues" acende aqui (store compartilhada).

## View 2 — Guardião Técnico (desktop)

- Sidebar esquerda: cards de métricas ("12 Pendentes em Ibura", "5 Em Análise", "23 Concluídos") + filtro por bairro.
- Painel dividido:
  - Lista esquerda: solicitações com thumbnail (trinca/erosão), nome, bairro, badge de risco.
  - Painel direito de detalhe:
    - Seletor de risco: toggle 3 estados (Baixo/Médio/Alto) usando paleta de status; atualiza chip dinamicamente.
    - Task Matrix Builder: lista editável pré-populada com as 2 tarefas do brief; "+ Adicionar Tarefa" adiciona linha; cada linha tem tipo (Logística/Execução), descrição, placeholder de responsável.
    - CTA "Publicar na Rede Arcanjo" (Azul, hover dourado) — envia tarefas para o feed do Anjo via store compartilhada + toast.

## View 3 — Anjo sem Asa (mobile-first)

- Header de perfil: avatar, "Anjo Rafael", badge dourado "Nível 3", barra de progresso "⚡ 120 Pontos de Solidariedade" em direção ao próximo nível.
- Feed de missões: cards de tarefas ativas em Ibura / Nova Descoberta com distância, peso, botão dourado "Aceitar Missão".
- Ao aceitar → `LastMileMap` abre:
  - SVG vertical, ~300×600px.
  - Base: ícone `Store` rotulado "Armazém do Seu Zé".
  - Trilha: linha tracejada azul sinuosa (dash offset animado via framer-motion).
  - Topo: ícone `Home` rotulado "Lar da Dona Maria".
  - Banner de aviso: "⚠️ Escadaria íngreme. Use carrinho de mão ou mochila."
  - CTA dourado "Validar no Topo" → `QRScanModal` (frame scanner simulado, linha laser animada) → scan simulado → confetti + atualiza timeline da view Lar.

## View 4 — Escada de Jacó (desktop/tablet)

- Header: título dourado "Escada de Jacó", subtítulo em Deep Blue.
- Pódio vertical top 3 empilhado como degraus ascendentes em uma escada dourada:
  - #1 Anjo Gabriel — avatar grande com borda dourada, tier "Arcanjo Lendário".
  - #2 "Serafim Protetor", #3 "Querubim" abaixo.
- Lista rolável 4–50 com número de rank, avatar, nome, bairro, "Missões Completadas" alinhado à direita. Destaque sutil no hover.
- Card fixo inferior Deep Blue: "Você está no 14º degrau. Complete mais 1 missão para se tornar um Serafim!" com mini barra de progresso.

## Integração

- Store leve (Zustand ou React Context) para: status do residente, lista de tarefas publicadas, entregas concluídas — conectando as views no demo.
- Framer Motion: crossfade entre views, scale-in do modal, pulso da timeline, animação dash da trilha, entrada do pódio, confetti.
- SEO/head: title "Rede Arcanjo — Dignidade Habitacional no Recife", description, og tags.
- Imagens geradas: 1 foto de trinca, 3–4 thumbnails de erosão, avatares placeholder (ou DiceBear URLs para ranking).

## Fora de Escopo (protótipo pitch)

- Auth real, backend real, mapas/geolocalização real, QR scan real, persistência além de memória.
