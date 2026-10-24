export type NivelRisco = "baixo" | "medio" | "alto";

export type Ocorrencia = {
  id: number;
  descricao: string;
  local: string;
  trecho: string;
  risco: NivelRisco;
  data: string;
};
