import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ocorrencia } from "../types/Ocorrencia";

const CORES_RISCO: Record<Ocorrencia["risco"], string> = {
  baixo: "#22C55E",
  medio: "#F59E0B",
  alto: "#EF4444",
};

const LABEL_RISCO: Record<Ocorrencia["risco"], string> = {
  baixo: "Risco baixo",
  medio: "Risco médio",
  alto: "Risco alto",
};

type Props = {
  ocorrencia: Ocorrencia;
  onPress: () => void;
};

export default function OcorrenciaCard({ ocorrencia, onPress }: Props) {
  return (
    <Pressable style={estilos.card} onPress={onPress}>
      <View style={estilos.cabecalho}>
        <Text style={estilos.trecho}>{ocorrencia.trecho}</Text>
        <View style={[estilos.selo, { backgroundColor: CORES_RISCO[ocorrencia.risco] }]}>
          <Text style={estilos.seloTexto}>{LABEL_RISCO[ocorrencia.risco]}</Text>
        </View>
      </View>

      <Text style={estilos.descricao} numberOfLines={2}>
        {ocorrencia.descricao}
      </Text>

      <Text style={estilos.local}>{ocorrencia.local}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  card: {
    backgroundColor: "#1E293B",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  trecho: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    flexShrink: 1,
    marginRight: 8,
  },
  selo: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  seloTexto: {
    color: "#0F172A",
    fontSize: 11,
    fontWeight: "700",
  },
  descricao: {
    color: "#F1F5F9",
    fontSize: 15,
    marginBottom: 4,
  },
  local: {
    color: "#64748B",
    fontSize: 13,
  },
});
