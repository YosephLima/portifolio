import { certificacaoSchema } from "../../../shared/schemas/certificacao.schema.js";
import { prisma } from "../prisma/client.js";

function validarCertificacao(body, res) {
  const parsed = certificacaoSchema.safeParse(body);

  if (!parsed.success) {
    const errors = {};
    parsed.error.issues.forEach((err) => {
      const field = err.path[0];
      if (!errors[field]) errors[field] = [];
      errors[field].push(err.message);
    });
    res.status(400).json({ message: "Dados de certificação inválidos", errors });
    return null;
  }

  return parsed.data;
}

// GET /certificacoes
async function listar(req, res) {
  try {
    const items = await prisma.certificacao.findMany();
    res.json(items);
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

// GET /certificacoes/:id
async function buscarPorId(req, res) {
  const id = Number(req.params.id);

  try {
    const item = await prisma.certificacao.findUnique({ where: { id } });
    if (!item) return res.status(404).json({ message: "Certificação não encontrada" });
    res.json(item);
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

// POST /certificacoes
async function criar(req, res) {
  const data = validarCertificacao(req.body, res);
  if (!data) return;

  try {
    const novo = await prisma.certificacao.create({ data });
    res.status(201).json(novo);
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

// PUT /certificacoes/:id
async function atualizar(req, res) {
  const id = Number(req.params.id);

  try {
    const existe = await prisma.certificacao.findUnique({ where: { id } });
    if (!existe) return res.status(404).json({ message: "Certificação não encontrada" });

    const data = validarCertificacao(req.body, res);
    if (!data) return;

    const atualizado = await prisma.certificacao.update({ where: { id }, data });
    res.json(atualizado);
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

// DELETE /certificacoes/:id
async function remover(req, res) {
  const id = Number(req.params.id);

  try {
    const existe = await prisma.certificacao.findUnique({ where: { id } });
    if (!existe) return res.status(404).json({ message: "Certificação não encontrada" });

    await prisma.certificacao.delete({ where: { id } });
    res.json({ message: "Certificação removida com sucesso" });
  } catch {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

export { listar, buscarPorId, criar, atualizar, remover };
