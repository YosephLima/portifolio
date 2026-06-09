import { z } from "zod";

export const projetoSchema = z.object({
    titulo: z.string().min(1, "Título é obrigatório"),
    finalizado: z.boolean(),
    img: z.string().min(1, "Imagem é obrigatória"),
    descricao: z.string().min(1, "Descrição é obrigatória"),
    tecnologias: z
        .array(z.string().min(1, "Tecnologia é obrigatória"))
        .min(1, "Tecnologias são obrigatórias"),
    link: z.string().nullable().optional(),
});
