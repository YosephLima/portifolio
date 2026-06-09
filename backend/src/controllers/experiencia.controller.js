import { experienciaSchema } from "../../../shared/schemas/experiencia.schema.js";
import { prisma } from "../prisma/client.js";

function validarExperiencia(body, res) {
  const parsed = experienciaSchema.safeParse(body);

  if (!parsed.success) {
    const errors = {};
    parsed.error.issues.forEach((err) => {
      const field = err.path[0];
      if (!errors[field]) errors[field] = [];
      errors[field].push(err.message);
    });
    res.status(400).json({ message: "Dados de experiência inválidos", errors });
    return null;
  }

  return parsed.data;
}

// GET /experiencias
async function listar(req, res) {
  try {
    const items = await prisma.experiencia.findMany();
    res.json(items);
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

// GET /experiencias/:id
async function buscarPorId(req, res) {
  const id = Number(req.params.id);

  try {
    const item = await prisma.experiencia.findUnique({ where: { id } });
    if (!item) return res.status(404).json({ message: "Experiência não encontrada" });
    res.json(item);
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

// POST /experiencias
async function criar(req, res) {
  const data = validarExperiencia(req.body, res);
  if (!data) return;

  try {
    if (data.atual) {
      await prisma.experiencia.updateMany({ where: { atual: true }, data: { atual: false } });
    }
    const novo = await prisma.experiencia.create({ data });
    res.status(201).json(novo);
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

// PUT /experiencias/:id
async function atualizar(req, res) {
  const id = Number(req.params.id);

  try {
    const existe = await prisma.experiencia.findUnique({ where: { id } });
    if (!existe) return res.status(404).json({ message: "Experiência não encontrada" });

    const data = validarExperiencia(req.body, res);
    if (!data) return;

    if (data.atual) {
      await prisma.experiencia.updateMany({ where: { atual: true, id: { not: id } }, data: { atual: false } });
    }
    const atualizado = await prisma.experiencia.update({ where: { id }, data });
    res.json(atualizado);
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

// DELETE /experiencias/:id
async function remover(req, res) {
  const id = Number(req.params.id);

  try {
    const existe = await prisma.experiencia.findUnique({ where: { id } });
    if (!existe) return res.status(404).json({ message: "Experiência não encontrada" });

    await prisma.experiencia.delete({ where: { id } });
    res.json({ message: "Experiência removida com sucesso" });
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

export { listar, buscarPorId, criar, atualizar, remover };
