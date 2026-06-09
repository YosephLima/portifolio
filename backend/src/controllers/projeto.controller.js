import { projetoSchema } from "../../../shared/schemas/projeto.schema.js";
import { prisma } from "../prisma/client.js";

function validarProjeto(body, res) {
  const parsed = projetoSchema.safeParse(body);

  if (!parsed.success) {
    const errors = {};
    parsed.error.issues.forEach((err) => {
      const field = err.path[0];
      if (!errors[field]) errors[field] = [];
      errors[field].push(err.message);
    });
    res.status(400).json({ message: "Dados de projeto inválidos", errors });
    return null;
  }

  return parsed.data;
}

// GET /projetos
async function listar(req, res) {
  try {
    const items = await prisma.projeto.findMany();
    res.json(items);
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

// GET /projetos/:id
async function buscarPorId(req, res) {
  const id = Number(req.params.id);

  try {
    const item = await prisma.projeto.findUnique({ where: { id } });
    if (!item) return res.status(404).json({ message: "Projeto não encontrado" });
    res.json(item);
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

// POST /projetos
async function criar(req, res) {
  const data = validarProjeto(req.body, res);
  if (!data) return;

  try {
    const novo = await prisma.projeto.create({ data });
    res.status(201).json(novo);
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

// PUT /projetos/:id
async function atualizar(req, res) {
  const id = Number(req.params.id);

  try {
    const existe = await prisma.projeto.findUnique({ where: { id } });
    if (!existe) return res.status(404).json({ message: "Projeto não encontrado" });

    const data = validarProjeto(req.body, res);
    if (!data) return;

    const atualizado = await prisma.projeto.update({ where: { id }, data });
    res.json(atualizado);
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

// DELETE /projetos/:id
async function remover(req, res) {
  const id = Number(req.params.id);

  try {
    const existe = await prisma.projeto.findUnique({ where: { id } });
    if (!existe) return res.status(404).json({ message: "Projeto não encontrado" });

    await prisma.projeto.delete({ where: { id } });
    res.json({ message: "Projeto removido com sucesso" });
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

export { listar, buscarPorId, criar, atualizar, remover };
