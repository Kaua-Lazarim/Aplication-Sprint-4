import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ocorrencia } from "../types/Ocorrencia";

const CORES_RISCO: Record<Ocorrencia["risco"], string> = {
  baixo: "#22C55E",
  medio: "#F59E0B",
  alto: "#EF4444",
};

type Props = {
  ocorrencia: Ocorrencia;
  onVoltar: () => void;
};

export default function Detalhe({ ocorrencia, onVoltar }: Props) {
  const dataFormatada = new Date(ocorrencia.data).toLocaleString("pt-BR");

  return (
    <ScrollView style={estilos.container}>
      <Pressable onPress={onVoltar}>
        <Text style={estilos.voltar}>{"< Voltar"}</Text>
      </Pressable>

      <View style={[estilos.selo, { backgroundColor: CORES_RISCO[ocorrencia.risco] }]}>
        <Text style={estilos.seloTexto}>Risco {ocorrencia.risco}</Text>
      </View>

      <Text style={estilos.trecho}>{ocorrencia.trecho}</Text>
      <Text style={estilos.local}>{ocorrencia.local}</Text>

      <Text style={estilos.rotulo}>Descrição</Text>
      <Text style={estilos.descricao}>{ocorrencia.descricao}</Text>

      <Text style={estilos.rotulo}>Registrado em</Text>
      <Text style={estilos.data}>{dataFormatada}</Text>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#0F172A" },
  voltar: { color: "#94A3B8", fontSize: 15, marginBottom: 20 },
  selo: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 12,
  },
  seloTexto: { color: "#0F172A", fontWeight: "700", textTransform: "capitalize" },
  trecho: { color: "#F1F5F9", fontSize: 22, fontWeight: "700" },
  local: { color: "#64748B", fontSize: 14, marginTop: 2, marginBottom: 20 },
  rotulo: { color: "#94A3B8", fontSize: 13, marginTop: 16, marginBottom: 4 },
  descricao: { color: "#F1F5F9", fontSize: 15, lineHeight: 22 },
  data: { color: "#F1F5F9", fontSize: 15 },
});
