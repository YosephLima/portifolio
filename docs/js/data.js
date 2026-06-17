// FONTE ÚNICA DE DADOS (formato do banco).
// Consumido por:
//   - Frontend (GitHub Pages, modo mock): docs/js/api.js
//   - Seed do backend: backend/prisma/seed.js (import via ../../docs/js/data.js)
// Mantenha os formatos abaixo alinhados ao schema do Prisma.

export const apresentacao = {
    titulo: 'Olá - sou Yoseph Levi',
    texto_negrito: 'Desenvolvedor de Software focado em criar aplicações web que automatizam e organizam processos nos mais variados setores',
    texto_completo: 'Sou um Desenvolvedor de Software focado em criar aplicações web que automatizam e organizam processos nos mais variados setores. Meu Fascínio pela Tecnologia (Principalmente na Computação) tem me levado a entender cada vez mais as camadas mais profundas do funcionamento das tecnologias atuais.',
};

export const formacao = [
    {
        nome: 'Desenvolvimento de Software Multiplataforma',
        local: 'FATEC Prof. Jessen Vidal - São José dos Campos',
        inicio: 2025,
        fim: 2028,
        status: true,
    },
    {
        nome: 'Técnico em Desenvolvimento de Sistemas',
        local: 'SENAI Félix Guisard - Taubaté',
        inicio: 2021,
        fim: 2023,
        status: false,
    },
];

// Já agrupado no formato que store.experiencias espera
export const experiencias = [
    {
        trabalhos: [
            {
                nome: 'Desenvolvedor Júnior',
                local: 'Isolar Energy',
                inicio: 'Ago 2025',
                fim: 'Presente',
                descricao: "Implementações de novas funcionalidades, refatorações, conexões com API's externas e planilhas de cálculo transformadas em código.",
                tecnologias: ['React', 'TypeScript', 'PHP', 'MySQL', 'Docker', "API's RESTful"],
                atual: true,
            },
        ],
    },
    {
        trabalhos: [
            {
                nome: 'Estagiário de Desenvolvimento',
                local: 'Isolar Energy',
                inicio: 'Set 2024',
                fim: 'Jul 2025',
                descricao: 'Alterações em sistemas legados e desenvolvimento de novas funcionalidades simples.',
                tecnologias: ['React', 'TypeScript', 'PHP', 'MySQL'],
                atual: false,
            },
            {
                nome: 'Auxiliar de Engenharia/Topografia',
                local: 'Isolar Energy',
                inicio: 'Jun 2024',
                fim: 'Jun 2025',
                descricao: 'Atividades de topografia (em campo e escritório) e suporte à equipe de engenharia.',
                tecnologias: ['Excel', 'Agisoft Metashape', 'Google Earth Pro', 'Aparelhos RTK (GNSS)'],
                atual: false,
            },
        ],
    },
];

// Já agrupado no formato que store.habilidades espera
export const habilidades = [
    {
        categoria: 'Front-End',
        items: [
            { nome: 'HTML', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
            { nome: 'CSS', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
            { nome: 'JavaScript', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
            { nome: 'TypeScript', img: './img/tecs/ts.png' },
            { nome: 'React.js', img: './img/tecs/react.png' },
            { nome: 'Vite.js', img: './img/tecs/vite.png' },
            { nome: 'Bootstrap', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
            { nome: 'Tailwind', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
        ],
    },
    {
        categoria: 'Back-End',
        items: [
            { nome: 'PHP', img: './img/tecs/php.png' },
            { nome: 'C', img: './img/tecs/c.png' },
            { nome: 'Python', img: './img/tecs/python.png' },
            { nome: 'Flask', img: './img/tecs/flask.png' },
            { nome: 'REST APIs', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
            { nome: 'MySQL', img: './img/tecs/mysql.png' },
            { nome: 'PrismaORM', img: './img/tecs/prismaorm.png' },
            { nome: 'Node.js', img: 'https://cdn.iconscout.com/icon/free/png-256/free-no-js-icon-svg-download-png-1174935.png?f=webp&w=128' },
        ],
    },
    {
        categoria: 'Ferramentas',
        items: [
            { nome: 'Git', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
            { nome: 'GitHub', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
            { nome: 'Docker', img: './img/tecs/docker.png' },
            { nome: 'AWS', img: './img/tecs/aws.png' },
            { nome: 'XAMPP', img: './img/tecs/xampp.png' },
            { nome: 'VS Code', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
        ],
    },
];

export const projetos = [
    {
        titulo: 'My Personal Accounting',
        finalizado: false,
        img: './img/contabilidade.png',
        descricao: 'Aplicação completa para gestão de finanças pessoais, com controle de despesas e receitas. Sendo um projeto pessoal, <b>sou o único Desenvolvedor (Full-Stack)</b>, criando o layout, modelando o banco de dados e estruturando o Front e Back-End. Atualmente será de uso interno, mas planejo moldá-lo para um projeto público.',
        link: null,
        tecnologias: ['React.js', 'Vite.js', 'TypeScript', 'PHP', 'MySQL', 'Docker'],
    },
    {
        titulo: 'Planeja SJC',
        finalizado: true,
        img: './img/PlanejaSJC.png',
        descricao: 'Plataforma de Gráficos interativos sobre os dados do Censo 2022 do município de São José dos Campos. Desenvolvido como Projeto Integrador na FATEC SJC, <b>tive minha participação como Product Owner & Back-End Developer</b>, responsável por, principalmente, estruturar a disposição dos gráficos.',
        link: 'https://github.com/OmniDevsOficial/API-Censo-2022',
        tecnologias: ['HTML', 'CSS', 'MySQL', 'AWS', 'Python', 'Flask'],
    },
    {
        titulo: 'Plataforma Normativa Aeronáutica',
        finalizado: true,
        img: './img/akaer.png',
        descricao: 'Sendo <b>um desafio proposto pela Akaer (em parceria com a FATEC)</b>, é uma Plataforma web estruturada para centralizar, organizar e correlacionar requisitos normativos, visando transformar um processo manual e descentralizado em uma fonte de dados organizada, facilitando buscas e evitando uso de versões obsoletas. Desenvolvido como Projeto Integrador na FATEC SJC, <b>tive minha participação como Front-End Developer</b>, atuando na criação de componentes/páginas, como o formulário de cadastro de normas, e em diversas integrações de páginas com o backend.',
        link: 'https://github.com/OmniDevsOficial/API-Akaer',
        tecnologias: ['React.js', 'Vite.js', 'TypeScript', 'Node.js', 'Express', 'PrismaORM', 'MySQL'],
    },
];

export const certificacoes = [
    {
        nome: 'Técnico em Desenvolvimento de Sistemas',
        instituicao: 'SENAI Taubaté',
        ano: 2023,
        url: null,
    },
    {
        nome: 'Programação de Robôs Industriais',
        instituicao: 'SENAI Taubaté',
        ano: 2023,
        url: null,
    },
    {
        nome: 'AWS Academy Cloud Foundations',
        instituicao: 'Amazon Web Services',
        ano: 2022,
        url: 'https://www.credly.com/badges/00fa832f-d2fc-415b-8ede-0e2e63e1f115/print',
    },
    {
        nome: 'Escola de Inovadores',
        instituicao: 'INOVA CPS',
        ano: 2025,
        url: 'https://drive.google.com/file/d/1tV3KV7SpCNKKyRnOwVJj_p8aiaM-UUPr/view',
    },
];
