import { formaContatoSchema } from "../../../shared/schemas/forma_contato.schema.js";
import { prisma } from "../prisma/client.js";

function validarFormaContato(body, res) {
  const parsed = formaContatoSchema.safeParse(body);

  if (!parsed.success) {
    const errors = {};
    parsed.error.issues.forEach((err) => {
      const field = err.path[0];
      if (!errors[field]) errors[field] = [];
      errors[field].push(err.message);
    });
    res.status(400).json({ message: "Dados de forma de contato inválidos", errors });
    return null;
  }

  return parsed.data;
}

// GET /formas-contato
async function listar(req, res) {
  try {
    const items = await prisma.formaContato.findMany();
    res.json(items);
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

// GET /formas-contato/:id
async function buscarPorId(req, res) {
  const id = Number(req.params.id);

  try {
    const item = await prisma.formaContato.findUnique({ where: { id } });
    if (!item) return res.status(404).json({ message: "Forma de contato não encontrada" });
    res.json(item);
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

// POST /formas-contato
async function criar(req, res) {
  const data = validarFormaContato(req.body, res);
  if (!data) return;

  try {
    const novo = await prisma.formaContato.create({ data });
    res.status(201).json(novo);
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

// PUT /formas-contato/:id
async function atualizar(req, res) {
  const id = Number(req.params.id);

  try {
    const existe = await prisma.formaContato.findUnique({ where: { id } });
    if (!existe) return res.status(404).json({ message: "Forma de contato não encontrada" });

    const data = validarFormaContato(req.body, res);
    if (!data) return;

    const atualizado = await prisma.formaContato.update({ where: { id }, data });
    res.json(atualizado);
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

// DELETE /formas-contato/:id
async function remover(req, res) {
  const id = Number(req.params.id);

  try {
    const existe = await prisma.formaContato.findUnique({ where: { id } });
    if (!existe) return res.status(404).json({ message: "Forma de contato não encontrada" });

    await prisma.formaContato.delete({ where: { id } });
    res.json({ message: "Forma de contato removida com sucesso" });
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

export { listar, buscarPorId, criar, atualizar, remover };
