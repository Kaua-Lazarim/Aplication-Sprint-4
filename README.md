# Motiva — Sprint 3: App Persistente

App de apoio a gestores e supervisores de rodovia para acompanhar o
crescimento de vegetação nos entornos da pista e registrar ocorrências,
com classificação de risco (baixo, médio, alto), facilitando a gestão
das equipes de manutenção.

O conceito de produto (Motiva) foi definido em grupo nas Sprints
anteriores. Esta entrega — o app persistente da Sprint 3 — foi
implementada individualmente.

## Integrante responsável por esta entrega

| Nome | RM |
|---|---|
| Kauã Lazarim | 564625 |

Repositório: `<link do GitHub aqui>`

## Como rodar

```bash
npm install
npx expo start
```

Escaneie o QR code exibido no terminal com o app Expo Go (Android/iOS)
ou rode em um emulador a partir do menu do Expo.

## Estrutura do projeto

```
src/
  screens/      # Lista, Cadastro e Detalhe
  components/   # OcorrenciaCard (reutilizável)
  types/        # Ocorrencia
  data/         # mock.ts — semente inicial, não é fonte após o cadastro
  services/     # ocorrenciasService.ts — única parte que fala com o AsyncStorage
```

As telas nunca importam `AsyncStorage` diretamente; toda leitura e
escrita passa pelo `ocorrenciasService`.

## Modelagem

```typescript
export type Ocorrencia = {
  id: number;
  descricao: string;
  local: string;
  trecho: string;
  risco: "baixo" | "medio" | "alto";
  data: string;
};
```

O campo `trecho` (nome da rodovia) foi adicionado ao domínio da Motiva,
além dos campos obrigatórios do enunciado, e é usado de verdade nas
três telas.

## Como os dados são persistidos

- Toda ocorrência é salva no `AsyncStorage` sob a chave
  `@motiva:ocorrencias`, como um array serializado em JSON.
- Na primeira execução do app (chave ainda inexistente), o
  `ocorrenciasService` semeia o storage com os dados de
  `src/data/mock.ts` e já persiste esse conteúdo. A partir daí, o mock
  não é mais consultado — o storage é a única fonte.
- Ao cadastrar uma ocorrência, `salvarOcorrencia` lê o que já está
  persistido, adiciona o novo registro (com `id` e `data` gerados no
  momento do cadastro) e regrava o array inteiro no `AsyncStorage`.
- O `App.tsx` mantém uma cópia em memória (`useState`) apenas para
  renderizar a lista rapidamente; essa cópia é sempre atualizada com o
  retorno do service, nunca é a origem dos dados.

## Fluxo do app

1. **Criar**: na Lista, toque em "+ Nova" → preencha trecho, local,
   descrição e risco → "Salvar". O app chama
   `ocorrenciasService.salvarOcorrencia`, que grava no AsyncStorage.
2. **Listar**: ao voltar do cadastro, a Lista mostra a nova ocorrência
   imediatamente, sem reiniciar o app — o `App.tsx` atualiza o estado
   com o retorno do service.
3. **Ver detalhe**: toque em qualquer card para abrir a tela de
   Detalhe, com trecho, local, descrição, selo de risco e data.
4. **Reabrir o app**: ao fechar e abrir novamente, o `App.tsx` chama
   `ocorrenciasService.obterOcorrencias()` no `useEffect` inicial, e a
   Lista aparece exatamente como estava antes de fechar.
