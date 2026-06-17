import { prisma } from "../src/prisma/client.js";
// Fonte única de dados (formato do banco), compartilhada com o frontend.
import { apresentacao, formacao, experiencias, habilidades, projetos, certificacoes } from "../../docs/js/data.js";

async function seedApresentacao() {
    await prisma.apresentacao.upsert({
        where: { id: 1 },
        update: apresentacao,
        create: apresentacao,
    });
}

async function seedFormacao() {
    const count = await prisma.formacao.count();
    if (count > 0) return;

    await prisma.formacao.createMany({ data: formacao });
}

async function seedExperiencias() {
    const count = await prisma.experiencia.count();
    if (count > 0) return;

    const todas = experiencias.flatMap((e) => e.trabalhos);
    await prisma.experiencia.createMany({ data: todas });
}

async function seedHabilidades() {
    const count = await prisma.habilidadeTecnica.count();
    if (count > 0) return;

    const todas = habilidades.flatMap((cat) =>
        cat.items.map((item) => ({
            nome: item.nome,
            categoria: cat.categoria,
            img: item.img,
        }))
    );

    await prisma.habilidadeTecnica.createMany({ data: todas });
}

async function seedProjetos() {
    const count = await prisma.projeto.count();
    if (count > 0) return;

    await prisma.projeto.createMany({ data: projetos });
}

async function seedCertificacoes() {
    const count = await prisma.certificacao.count();
    if (count > 0) return;

    await prisma.certificacao.createMany({ data: certificacoes });
}

async function seedFormasContato() {
    const count = await prisma.formaContato.count();
    if (count > 0) return;

    await prisma.formaContato.createMany({
        data: [
            { img: "bi bi-linkedin", url: "https://www.linkedin.com/in/yoseph-levi-rodrigues-de-lima-7020b324a/" },
            { img: "bi bi-github",   url: "https://github.com/YosephLima" },
            { img: "bi bi-envelope", url: "mailto:yosephlima501@gmail.com" },
        ],
    });
}

async function main() {
    console.log("Iniciando seed...");

    await seedApresentacao();
    console.log("✓ Apresentação");

    await seedFormacao();
    console.log("✓ Formação");

    await seedExperiencias();
    console.log("✓ Experiências");

    await seedHabilidades();
    console.log("✓ Habilidades técnicas");

    await seedProjetos();
    console.log("✓ Projetos");

    await seedCertificacoes();
    console.log("✓ Certificações");

    await seedFormasContato();
    console.log("✓ Formas de contato");

    console.log("Seed concluído.");
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
