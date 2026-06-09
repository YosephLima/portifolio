import { z } from "zod";

export const certificacaoSchema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    instituicao: z.string().min(1, "Instituição é obrigatória"),
    ano: z.number().int().refine((value) => value >= 1000 && value <= 9999, {
        message: "Ano deve ter 4 dígitos",
    }),
    url: z.string().nullable().optional(),
});
