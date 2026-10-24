# Motiva — Gestão de Ocorrências de Vegetação em Rodovias

> Entrega final do Challenge (Sprint 4 — Documentação e Demonstração).
> O código da Sprint 3 é a versão final do app; esta sprint documenta e demonstra o que já existe.

## Vídeo de demonstração


## Integrantes

| Nome | RM |
|---|---|
| Kauã Lazarim | 564625 |

## Repositório

🔗 https://github.com/Kaua-Lazarim/Aplication-Sprint-4/

---

## 1. O problema, o usuário e a ação principal

**Problema.** Nas rodovias, o crescimento de vegetação nos entornos da pista (acostamento, canteiro central, placas de sinalização) precisa ser acompanhado e tratado pelas equipes de manutenção. Sem um registro organizado, fica difícil saber *onde* está o problema, *o que* foi observado e *quão grave* ele é para priorizar o trabalho das equipes.

**Usuário.** Gestores e supervisores de rodovia, que precisam acompanhar o estado da vegetação ao longo dos trechos e orientar as equipes de manutenção.

**Ação principal.** Registrar uma ocorrência de vegetação (trecho, local, descrição e nível de risco) e consultá-la depois em uma lista priorizável visualmente pela classificação de risco, com os dados guardados no próprio aparelho.

O conceito de produto da Motiva foi definido em grupo nas sprints anteriores. O app persistente (Sprint 3) e esta documentação foram implementados individualmente.

## 2. Stack

| Tecnologia | Versão | Uso |
|---|---|---|
| React Native | 0.74.5 | Interface mobile |
| Expo (SDK 51) | ~51.0.0 | Toolchain e execução (`expo start`) |
| TypeScript | ~5.3.3 (`strict: true`) | Tipagem de todo o código |
| AsyncStorage (`@react-native-async-storage/async-storage`) | 1.23.1 | Persistência local |
| React | 18.2.0 | Estado e ciclo de vida (`useState`, `useEffect`) |

A navegação entre telas é feita por estado (`useState`) em `App.tsx`, sem biblioteca de rotas.

## 3. Estrutura de pastas

```
motiva/
├── App.tsx                          # Raiz: estado global, navegação por useState, carga inicial
├── index.ts                         # registerRootComponent(App)
├── app.json                         # Configuração do Expo
├── package.json
├── tsconfig.json
└── src/
    ├── types/
    │   └── Ocorrencia.ts            # Tipos Ocorrencia e NivelRisco
    ├── data/
    │   └── mock.ts                  # 3 ocorrências de exemplo (semente da 1ª execução)
    ├── services/
    │   └── ocorrenciasService.ts    # Único ponto que acessa o AsyncStorage
    ├── components/
    │   └── OcorrenciaCard.tsx       # Card da lista, com selo de risco
    └── screens/
        ├── Lista.tsx                # Lista de ocorrências
        ├── Cadastro.tsx             # Formulário de nova ocorrência
        └── Detalhe.tsx              # Detalhe de uma ocorrência
```

As telas **nunca** importam o `AsyncStorage` diretamente: toda leitura e escrita passa pelo `ocorrenciasService`.

## 4. O tipo `Ocorrencia` e onde é usado

Definido em `src/types/Ocorrencia.ts`:

```typescript
export type NivelRisco = "baixo" | "medio" | "alto";

export type Ocorrencia = {
  id: number;
  descricao: string;
  local: string;
  trecho: string;
  risco: NivelRisco;
  data: string;
};
```

| Campo | Significado |
|---|---|
| `id` | Identificador único (gerado com `Date.now()` no cadastro) |
| `descricao` | O que foi observado em campo |
| `local` | Posição no trecho (ex.: "Km 42 - sentido interior") |
| `trecho` | Nome da rodovia (ex.: "Rodovia dos Bandeirantes") |
| `risco` | Classificação: `"baixo"`, `"medio"` ou `"alto"` |
| `data` | Data/hora do registro, em ISO 8601 (gerada no cadastro) |

**Onde é usado:**

| Arquivo | Uso do tipo |
|---|---|
| `src/data/mock.ts` | Tipa o array `ocorrenciasIniciais` |
| `src/services/ocorrenciasService.ts` | Retorno de `obterOcorrencias`; `salvarOcorrencia` recebe `Omit<Ocorrencia, "id" \| "data">` e devolve a lista atualizada |
| `App.tsx` | Estado `ocorrencias` e a tela de detalhe (`ocorrencia` selecionada) |
| `src/screens/Lista.tsx` | Props `ocorrencias` e `onAbrirDetalhe` |
| `src/screens/Cadastro.tsx` | Monta o objeto (sem `id` e `data`) enviado em `onSalvar`; o tipo de `risco` define as 3 opções do seletor |
| `src/screens/Detalhe.tsx` | Prop `ocorrencia` exibida na tela |
| `src/components/OcorrenciaCard.tsx` | Prop `ocorrencia` e mapas de cor/rótulo por `risco` |

## 5. Como os dados são persistidos

- Todas as ocorrências ficam no **AsyncStorage**, na chave `@motiva:ocorrencias`, como um array serializado em JSON.
- **Primeira execução:** se a chave ainda não existe, o `ocorrenciasService` grava no storage as 3 ocorrências de `src/data/mock.ts`. A partir daí o mock não é mais consultado; o storage é a única fonte de dados.
- **Cadastro:** `salvarOcorrencia` lê o que já está persistido, adiciona o novo registro **no topo** (com `id` e `data` gerados naquele momento) e regrava o array inteiro.
- **Abertura do app:** o `App.tsx` chama `obterOcorrencias()` em um `useEffect` ao montar. Por isso os dados voltam depois de fechar e reabrir o app ou de recarregar o bundle.
- O estado em memória (`useState` em `App.tsx`) serve só para renderizar; ele é sempre preenchido com o retorno do service, nunca é a origem dos dados.
- Se a leitura do storage falhar, o service registra um aviso no console e a lista aparece vazia, sem fechar o app.

## 6. Como rodar

**Pré-requisitos:** Node.js 18 ou superior e um destino para abrir o app: celular com Expo Go ou emulador/simulador.

```bash
npm install
npx expo start
```

Com o servidor aberto no terminal:

- **Celular Android:** instale o Expo Go e escaneie o QR code.
- **Emulador Android / Simulador iOS:** pressione `a` (Android) ou `i` (iOS, somente macOS) no terminal.
- Pressione `r` para recarregar o app.

> **Atenção à versão do Expo Go.** O projeto usa o **Expo SDK 51**, e cada versão do Expo Go suporta uma única SDK. Se aparecer a mensagem de incompatibilidade de versão:
> - **Android (celular ou emulador) e iOS Simulator:** baixe o Expo Go da SDK 51 em <https://expo.dev/go> (escolha SDK 51 e a plataforma) e rode `npx expo start` novamente.
> - **iPhone/iPad físico:** a App Store não oferece Expo Go de SDK 51. Use um Android ou um simulador.
>
> Referência: [Expo Go version mismatch](https://docs.expo.dev/troubleshooting/expo-go-version-mismatch/).

## 7. Comportamento esperado

Passo a passo para validar o app do zero:

1. **Abrir o app.** A Lista aparece com o título "Motiva", o subtítulo "Ocorrências de vegetação na via" e, na primeira execução, as 3 ocorrências de exemplo (uma de cada nível de risco).
2. **Criar uma ocorrência.** Toque em **+ Nova**, preencha **Trecho**, **Local** e **Descrição**, escolha o **Risco** (`baixo`, `medio` ou `alto`; o padrão é `baixo`) e toque em **Salvar**. Se algum dos três campos de texto estiver vazio, o app mostra o alerta "Campos obrigatórios" e não salva. **Cancelar** volta à lista sem salvar.
3. **Ver na lista.** Ao salvar, o app volta à Lista e a nova ocorrência aparece **no topo**, imediatamente, sem reiniciar.
4. **Abrir o detalhe.** Toque em um card para ver selo de risco, trecho, local, descrição e a data/hora do registro. **< Voltar** retorna à lista.
5. **Fechar e reabrir o app** (ou recarregar com `r`). A lista volta exatamente como estava, incluindo a ocorrência criada no passo 2.

Se não houver nenhuma ocorrência, a Lista mostra "Nenhuma ocorrência registrada ainda."; enquanto os dados carregam, mostra um indicador de carregamento.

## 8. Classificação de risco (lista e detalhe)

O nível de risco é escolhido pelo usuário no cadastro e aparece como um **selo colorido** nos dois lugares:

| Risco | Cor do selo | Na lista (card) | No detalhe |
|---|---|---|---|
| Baixo | Verde `#22C55E` | Selo no canto superior do card | Selo acima do nome do trecho |
| Médio | Âmbar `#F59E0B` | Selo no canto superior do card | Selo acima do nome do trecho |
| Alto | Vermelho `#EF4444` | Selo no canto superior do card | Selo acima do nome do trecho |

As cores e rótulos vêm de mapas indexados pelo tipo `NivelRisco`, então um nível novo no tipo exige a cor correspondente em tempo de compilação.

## 9. Observações

- Os dados ficam **somente no aparelho** (AsyncStorage); não há backend nem sincronização entre dispositivos.
- Para repetir a demonstração do zero, limpe os dados do Expo Go ou reinstale-o. A função `limparOcorrencias` existe no service, mas não está ligada a nenhum botão do app.
