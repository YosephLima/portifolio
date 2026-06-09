import { z } from "zod";

export const apresentacaoSchema = z.object({
    titulo: z.string().min(1, "Título é obrigatório"),
    texto_negrito: z.string().min(1, "Texto em negrito é obrigatório"),
    texto_completo: z.string().min(1, "Texto completo é obrigatório"),
});
