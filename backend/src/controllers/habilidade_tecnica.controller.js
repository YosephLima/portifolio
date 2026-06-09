import { habilidadeTecnicaSchema } from "../../../shared/schemas/habilidade_tecnica.schema.js";
import { prisma } from "../prisma/client.js";

function validarHabilidadeTecnica(body, res) {
  const parsed = habilidadeTecnicaSchema.safeParse(body);

  if (!parsed.success) {
    const errors = {};
    parsed.error.issues.forEach((err) => {
      const field = err.path[0];
      if (!errors[field]) errors[field] = [];
      errors[field].push(err.message);
    });
    res.status(400).json({ message: "Dados de habilidade técnica inválidos", errors });
    return null;
  }

  return parsed.data;
}

// GET /habilidades-tecnicas
async function listar(req, res) {
  try {
    const items = await prisma.habilidadeTecnica.findMany();
    res.json(items);
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

// GET /habilidades-tecnicas/:id
async function buscarPorId(req, res) {
  const id = Number(req.params.id);

  try {
    const item = await prisma.habilidadeTecnica.findUnique({ where: { id } });
    if (!item) return res.status(404).json({ message: "Habilidade técnica não encontrada" });
    res.json(item);
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

// POST /habilidades-tecnicas
async function criar(req, res) {
  const data = validarHabilidadeTecnica(req.body, res);
  if (!data) return;

  try {
    const novo = await prisma.habilidadeTecnica.create({ data });
    res.status(201).json(novo);
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

// PUT /habilidades-tecnicas/:id
async function atualizar(req, res) {
  const id = Number(req.params.id);

  try {
    const existe = await prisma.habilidadeTecnica.findUnique({ where: { id } });
    if (!existe) return res.status(404).json({ message: "Habilidade técnica não encontrada" });

    const data = validarHabilidadeTecnica(req.body, res);
    if (!data) return;

    const atualizado = await prisma.habilidadeTecnica.update({ where: { id }, data });
    res.json(atualizado);
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

// DELETE /habilidades-tecnicas/:id
async function remover(req, res) {
  const id = Number(req.params.id);

  try {
    const existe = await prisma.habilidadeTecnica.findUnique({ where: { id } });
    if (!existe) return res.status(404).json({ message: "Habilidade técnica não encontrada" });

    await prisma.habilidadeTecnica.delete({ where: { id } });
    res.json({ message: "Habilidade técnica removida com sucesso" });
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

export { listar, buscarPorId, criar, atualizar, remover };
