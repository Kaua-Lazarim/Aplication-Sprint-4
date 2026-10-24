import { Ocorrencia } from "../types/Ocorrencia";

/**
 * Dados usados apenas para semear a lista na primeira vez que o app roda.
 * Depois da primeira leitura, o AsyncStorage passa a ser a única fonte
 * de verdade — este arquivo não é consultado de novo em runtime.
 */
export const ocorrenciasIniciais: Ocorrencia[] = [
  {
    id: 1,
    descricao: "Grama alta encobrindo parte da faixa de acostamento",
    local: "Km 42 - sentido interior",
    trecho: "Rodovia dos Bandeirantes",
    risco: "medio",
    data: new Date("2026-09-01T08:30:00").toISOString(),
  },
  {
    id: 2,
    descricao: "Vegetação invadindo placa de sinalização",
    local: "Km 17 - sentido capital",
    trecho: "Rodovia Anhanguera",
    risco: "alto",
    data: new Date("2026-09-05T14:10:00").toISOString(),
  },
  {
    id: 3,
    descricao: "Crescimento leve, sem prejuízo à visibilidade",
    local: "Km 63 - canteiro central",
    trecho: "Rodovia dos Bandeirantes",
    risco: "baixo",
    data: new Date("2026-09-10T09:00:00").toISOString(),
  },
];
