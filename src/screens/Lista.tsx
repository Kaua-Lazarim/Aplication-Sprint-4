import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Ocorrencia } from "../types/Ocorrencia";
import OcorrenciaCard from "../components/OcorrenciaCard";

type Props = {
  ocorrencias: Ocorrencia[];
  carregando: boolean;
  onNovaOcorrencia: () => void;
  onAbrirDetalhe: (ocorrencia: Ocorrencia) => void;
};

export default function Lista({ ocorrencias, carregando, onNovaOcorrencia, onAbrirDetalhe }: Props) {
  return (
    <View style={estilos.container}>
      <View style={estilos.topo}>
        <View>
          <Text style={estilos.titulo}>Motiva</Text>
          <Text style={estilos.subtitulo}>Ocorrências de vegetação na via</Text>
        </View>
        <Pressable style={estilos.botaoNovo} onPress={onNovaOcorrencia}>
          <Text style={estilos.botaoNovoTexto}>+ Nova</Text>
        </Pressable>
      </View>

      {carregando ? (
        <ActivityIndicator color="#F1F5F9" style={{ marginTop: 40 }} />
      ) : ocorrencias.length === 0 ? (
        <Text style={estilos.vazio}>Nenhuma ocorrência registrada ainda.</Text>
      ) : (
        <FlatList
          data={ocorrencias}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => (
            <OcorrenciaCard ocorrencia={item} onPress={() => onAbrirDetalhe(item)} />
          )}
        />
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#0F172A" },
  topo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  titulo: { color: "#F1F5F9", fontSize: 24, fontWeight: "700" },
  subtitulo: { color: "#94A3B8", fontSize: 13, marginTop: 2 },
  botaoNovo: {
    backgroundColor: "#22C55E",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  botaoNovoTexto: { color: "#0F172A", fontWeight: "700" },
  vazio: { color: "#64748B", marginTop: 40, textAlign: "center" },
});
