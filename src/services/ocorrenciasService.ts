import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ocorrencia } from "../types/Ocorrencia";
import { ocorrenciasIniciais } from "../data/mock";

const CHAVE_STORAGE = "@motiva:ocorrencias";

/**
 * Único ponto do app que fala com o AsyncStorage.
 * As telas nunca importam AsyncStorage diretamente — sempre passam por aqui.
 */

export async function obterOcorrencias(): Promise<Ocorrencia[]> {
  try {
    const bruto = await AsyncStorage.getItem(CHAVE_STORAGE);

    // raw === null só acontece na primeira execução do app (chave nunca
    // gravada). Nesse caso, e só nesse caso, semeamos com o mock e já
    // persistimos, para que da próxima leitura em diante o storage seja
    // a única fonte de verdade.
    if (bruto === null) {
      await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(ocorrenciasIniciais));
      return ocorrenciasIniciais;
    }

    return JSON.parse(bruto) as Ocorrencia[];
  } catch (erro) {
    console.warn("Falha ao carregar ocorrências do storage:", erro);
    return [];
  }
}

export async function salvarOcorrencia(
  novaOcorrencia: Omit<Ocorrencia, "id" | "data">
): Promise<Ocorrencia[]> {
  const atuais = await obterOcorrencias();

  const registro: Ocorrencia = {
    ...novaOcorrencia,
    id: Date.now(),
    data: new Date().toISOString(),
  };

  const atualizadas = [registro, ...atuais];

  await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(atualizadas));

  return atualizadas;
}

export async function limparOcorrencias(): Promise<void> {
  await AsyncStorage.removeItem(CHAVE_STORAGE);
}
