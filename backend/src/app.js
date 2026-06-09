import express from "express";
import cors from "cors";
import apresentacaoRoutes from "./routes/apresentacao.routes.js";
import certificacaoRoutes from "./routes/certificacao.routes.js";
import experienciaRoutes from "./routes/experiencia.routes.js";
import formacaoRoutes from "./routes/formacao.routes.js";
import formaContatoRoutes from "./routes/forma_contato.routes.js";
import habilidadeTecnicaRoutes from "./routes/habilidade_tecnica.routes.js";
import projetoRoutes from "./routes/projeto.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/apresentacao", apresentacaoRoutes);
app.use("/certificacoes", certificacaoRoutes);
app.use("/experiencias", experienciaRoutes);
app.use("/formacoes", formacaoRoutes);
app.use("/contatos", formaContatoRoutes);
app.use("/habilidades", habilidadeTecnicaRoutes);
app.use("/projetos", projetoRoutes);

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

export default app;