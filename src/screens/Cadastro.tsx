import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Ocorrencia } from "../types/Ocorrencia";

type Props = {
  onSalvar: (nova: Omit<Ocorrencia, "id" | "data">) => void;
  onCancelar: () => void;
};

const OPCOES_RISCO: Ocorrencia["risco"][] = ["baixo", "medio", "alto"];

export default function Cadastro({ onSalvar, onCancelar }: Props) {
  const [descricao, setDescricao] = useState("");
  const [local, setLocal] = useState("");
  const [trecho, setTrecho] = useState("");
  const [risco, setRisco] = useState<Ocorrencia["risco"]>("baixo");

  function handleSalvar() {
    if (!descricao.trim() || !local.trim() || !trecho.trim()) {
      Alert.alert("Campos obrigatórios", "Preencha trecho, local e descrição antes de salvar.");
      return;
    }

    onSalvar({
      descricao: descricao.trim(),
      local: local.trim(),
      trecho: trecho.trim(),
      risco,
    });
  }

  return (
    <ScrollView style={estilos.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <Text style={estilos.titulo}>Nova ocorrência</Text>

      <Text style={estilos.rotulo}>Trecho</Text>
      <TextInput
        style={estilos.input}
        placeholder="Ex.: Rodovia dos Bandeirantes"
        placeholderTextColor="#64748B"
        value={trecho}
        onChangeText={setTrecho}
      />

      <Text style={estilos.rotulo}>Local</Text>
      <TextInput
        style={estilos.input}
        placeholder="Ex.: Km 42 - sentido interior"
        placeholderTextColor="#64748B"
        value={local}
        onChangeText={setLocal}
      />

      <Text style={estilos.rotulo}>Descrição</Text>
      <TextInput
        style={[estilos.input, estilos.inputMultilinha]}
        placeholder="Descreva o que foi observado"
        placeholderTextColor="#64748B"
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <Text style={estilos.rotulo}>Risco</Text>
      <View style={estilos.opcoes}>
        {OPCOES_RISCO.map((opcao) => (
          <Pressable
            key={opcao}
            style={[estilos.opcao, risco === opcao && estilos.opcaoSelecionada]}
            onPress={() => setRisco(opcao)}
          >
            <Text style={[estilos.opcaoTexto, risco === opcao && estilos.opcaoTextoSelecionado]}>
              {opcao}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={estilos.acoes}>
        <Pressable style={estilos.botaoCancelar} onPress={onCancelar}>
          <Text style={estilos.botaoCancelarTexto}>Cancelar</Text>
        </Pressable>
        <Pressable style={estilos.botaoSalvar} onPress={handleSalvar}>
          <Text style={estilos.botaoSalvarTexto}>Salvar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#0F172A" },
  titulo: { color: "#F1F5F9", fontSize: 22, fontWeight: "700", marginBottom: 20 },
  rotulo: { color: "#94A3B8", fontSize: 13, marginBottom: 6, marginTop: 14 },
  input: {
    backgroundColor: "#1E293B",
    color: "#F1F5F9",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputMultilinha: { minHeight: 80, textAlignVertical: "top" },
  opcoes: { flexDirection: "row", marginTop: 4 },
  opcao: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#1E293B",
    alignItems: "center",
    marginRight: 8,
  },
  opcaoSelecionada: { backgroundColor: "#F1F5F9" },
  opcaoTexto: { color: "#94A3B8", fontWeight: "600", textTransform: "capitalize" },
  opcaoTextoSelecionado: { color: "#0F172A" },
  acoes: { flexDirection: "row", marginTop: 28 },
  botaoCancelar: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#1E293B",
    alignItems: "center",
    marginRight: 12,
  },
  botaoCancelarTexto: { color: "#94A3B8", fontWeight: "600" },
  botaoSalvar: { flex: 1, padding: 12, borderRadius: 8, backgroundColor: "#22C55E", alignItems: "center" },
  botaoSalvarTexto: { color: "#0F172A", fontWeight: "700" },
});
