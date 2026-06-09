import { formacaoSchema } from "../../../shared/schemas/formacao.schema.js";
import { prisma } from "../prisma/client.js";

function validarFormacao(body, res) {
  const parsed = formacaoSchema.safeParse(body);

  if (!parsed.success) {
    const errors = {};
    parsed.error.issues.forEach((err) => {
      const field = err.path[0];
      if (!errors[field]) errors[field] = [];
      errors[field].push(err.message);
    });
    res.status(400).json({ message: "Dados de formação inválidos", errors });
    return null;
  }

  return parsed.data;
}

// GET /formacoes
async function listar(req, res) {
  try {
    const items = await prisma.formacao.findMany();
    res.json(items);
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

// GET /formacoes/:id
async function buscarPorId(req, res) {
  const id = Number(req.params.id);

  try {
    const item = await prisma.formacao.findUnique({ where: { id } });
    if (!item) return res.status(404).json({ message: "Formação não encontrada" });
    res.json(item);
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

// POST /formacoes
async function criar(req, res) {
  const data = validarFormacao(req.body, res);
  if (!data) return;

  try {
    if (data.status) {
      await prisma.formacao.updateMany({ where: { status: true }, data: { status: false } });
    }
    const novo = await prisma.formacao.create({ data });
    res.status(201).json(novo);
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

// PUT /formacoes/:id
async function atualizar(req, res) {
  const id = Number(req.params.id);

  try {
    const existe = await prisma.formacao.findUnique({ where: { id } });
    if (!existe) return res.status(404).json({ message: "Formação não encontrada" });

    const data = validarFormacao(req.body, res);
    if (!data) return;

    if (data.status) {
      await prisma.formacao.updateMany({ where: { status: true, id: { not: id } }, data: { status: false } });
    }
    const atualizado = await prisma.formacao.update({ where: { id }, data });
    res.json(atualizado);
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

// DELETE /formacoes/:id
async function remover(req, res) {
  const id = Number(req.params.id);

  try {
    const existe = await prisma.formacao.findUnique({ where: { id } });
    if (!existe) return res.status(404).json({ message: "Formação não encontrada" });

    await prisma.formacao.delete({ where: { id } });
    res.json({ message: "Formação removida com sucesso" });
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

export { listar, buscarPorId, criar, atualizar, remover };
