import { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { Ocorrencia } from "./src/types/Ocorrencia";
import { obterOcorrencias, salvarOcorrencia } from "./src/services/ocorrenciasService";
import Lista from "./src/screens/Lista";
import Cadastro from "./src/screens/Cadastro";
import Detalhe from "./src/screens/Detalhe";

// Navegação simples via useState, como o enunciado permite.
// Cada variante do union carrega só o dado que a tela precisa.
type Tela = { nome: "lista" } | { nome: "cadastro" } | { nome: "detalhe"; ocorrencia: Ocorrencia };

export default function App() {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [tela, setTela] = useState<Tela>({ nome: "lista" });

  // Carrega o que já está persistido assim que o app monta —
  // é isso que faz os dados "sobreviverem" a fechar/reabrir o app.
  useEffect(() => {
    (async () => {
      const dados = await obterOcorrencias();
      setOcorrencias(dados);
      setCarregando(false);
    })();
  }, []);

  async function handleCriarOcorrencia(nova: Omit<Ocorrencia, "id" | "data">) {
    const atualizadas = await salvarOcorrencia(nova);
    setOcorrencias(atualizadas);
    setTela({ nome: "lista" });
  }

  return (
    <SafeAreaView style={estilos.container}>
      <StatusBar barStyle="light-content" />

      {tela.nome === "lista" && (
        <Lista
          ocorrencias={ocorrencias}
          carregando={carregando}
          onNovaOcorrencia={() => setTela({ nome: "cadastro" })}
          onAbrirDetalhe={(ocorrencia) => setTela({ nome: "detalhe", ocorrencia })}
        />
      )}

      {tela.nome === "cadastro" && (
        <Cadastro onSalvar={handleCriarOcorrencia} onCancelar={() => setTela({ nome: "lista" })} />
      )}

      {tela.nome === "detalhe" && (
        <Detalhe ocorrencia={tela.ocorrencia} onVoltar={() => setTela({ nome: "lista" })} />
      )}
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A" },
});
