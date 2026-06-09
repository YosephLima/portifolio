import { apresentacaoSchema } from "../../../shared/schemas/apresentacao.schema.js";
import { prisma } from "../prisma/client.js";

function validarApresentacao(body, res) {
  const parsed = apresentacaoSchema.safeParse(body);

  if (!parsed.success) {
    const errors = {};
    parsed.error.issues.forEach((err) => {
      const field = err.path[0];
      if (!errors[field]) errors[field] = [];
      errors[field].push(err.message);
    });
    res.status(400).json({ message: "Dados de apresentação inválidos", errors });
    return null;
  }

  return parsed.data;
}

// GET /apresentacao/:id
async function buscarPorId(req, res) {
  const id = Number(req.params.id);

  try {
    const item = await prisma.apresentacao.findUnique({ where: { id } });
    if (!item) return res.status(404).json({ message: "Apresentação não encontrada" });
    res.json(item);
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

// PUT /apresentacao/:id
async function atualizar(req, res) {
  const id = Number(req.params.id);

  try {
    const existe = await prisma.apresentacao.findUnique({ where: { id } });
    if (!existe) return res.status(404).json({ message: "Apresentação não encontrada" });

    const data = validarApresentacao(req.body, res);
    if (!data) return;

    const atualizado = await prisma.apresentacao.update({ where: { id }, data });
    res.json(atualizado);
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

// DELETE /apresentacao/:id
async function remover(req, res) {
  const id = Number(req.params.id);

  try {
    const existe = await prisma.apresentacao.findUnique({ where: { id } });
    if (!existe) return res.status(404).json({ message: "Apresentação não encontrada" });

    await prisma.apresentacao.delete({ where: { id } });
    res.json({ message: "Apresentação removida com sucesso" });
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

export { buscarPorId, atualizar, remover };
