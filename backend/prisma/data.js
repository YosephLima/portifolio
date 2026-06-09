export const adminPassword = 'admin'; // Senha temporária

export const apresentacao = {
    titulo: 'Olá - sou Yoseph Levi',
    texto_negrito: 'Desenvolvedor de Software focado em criar aplicações web que automatizam e organizam processos nos mais variados setores',
    texto_completo: 'Sou um Desenvolvedor de Software focado em criar aplicações web que automatizam e organizam processos nos mais variados setores. Meu Fascínio pela Tecnologia (Principalmente na Computação) tem me levado a entender cada vez mais as camadas mais profundas do funcionamento das tecnologias atuais.',
};

export const formacao = [
    {
        nome: 'Desenvolvimento de Software Multiplataforma',
        local: 'FATEC Prof. Jessen Vidal - São José dos Campos',
        periodo: '2025 - 2028',
        cursando: true,
    },
    {
        nome: 'Técnico em Desenvolvimento de Sistemas',
        local: 'SENAI Félix Guisard - Taubaté',
        periodo: '2021 - 2023',
        cursando: false,
    },
];

export const experiencias = [
    {
        trabalhos: [
            {
                cargo: 'Desenvolvedor Júnior',
                empresa: 'Isolar Energy',
                periodo: 'Ago 2025 - Presente',
                descricao: "Implementações de novas funcionalidades, refatorações, conexões com API's externas e planilhas de cálculo transformadas em código.",
                tecnologias: "React, TypeScript, PHP, MySQL, Docker, API's RESTful",
                atual: true,
            }
        ]
    },
    {
        trabalhos: [
            {
                cargo: 'Estagiário de Desenvolvimento',
                empresa: 'Isolar Energy',
                periodo: 'Set 2024 - Jul 2025',
                descricao: "Alterações em sistemas legados e desenvolvimento de novas funcionalidades simples.",
                tecnologias: "React, TypeScript, PHP, MySQL",
                atual: false,
            },
            {
                cargo: 'Auxiliar de Engenharia/Topografia',
                empresa: 'Isolar Energy',
                periodo: 'Jun 2024 - Jun 2025',
                descricao: "Atividades de topografia (em campo e escritório) e suporte à equipe de engenharia.",
                tecnologias: "Excel, Agisoft Metashape, Google Earth Pro, Aparelhos RTK (GNSS)",
                atual: false,
            }
        ]
    }
];

export const habilidades = [
    {
        key: 'front-end',
        types: 'Front-end',
        icon: 'bi bi-code-slash',
        items: [
            { nome: 'HTML', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
            { nome: 'CSS', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
            { nome: 'JavaScript', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
            { nome: 'TypeScript', img: './img/tecs/ts.png' },
            { nome: 'React.js', img: './img/tecs/react.png' },
            { nome: 'Vite.js', img: './img/tecs/vite.png' },
            { nome: 'Bootstrap', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
            { nome: 'Tailwind', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' }
        ]
    },
    {
        key: 'back-end',
        types: 'Back-end',
        icon: 'bi bi-server',
        items: [
            { nome: 'PHP', img: './img/tecs/php.png' },
            { nome: 'C', img: './img/tecs/c.png' },
            { nome: 'Python', img: './img/tecs/python.png' },
            { nome: 'Flask', img: './img/tecs/flask.png' },
            { nome: 'REST APIs', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
            { nome: 'MySQL', img: './img/tecs/mysql.png' }
        ]
    },
    {
        key: 'ferramentas',
        types: 'Ferramentas',
        icon: 'bi bi-tools',
        items: [
            { nome: 'Git', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
            { nome: 'GitHub', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
            { nome: 'Docker', img: './img/tecs/docker.png' },
            { nome: 'AWS', img: './img/tecs/aws.png' },
            { nome: 'XAMPP', img: './img/tecs/xampp.png' },
            { nome: 'VS Code', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' }
        ]
    }
];

export const projetos = [
    {
        nome: 'My Personal Accounting',
        status: 'Em Desenvolvimento',
        statusColor: 'yellow',
        img: './img/contabilidade.png',
        classeContainerImg: 'flex items-center justify-center mb-4 bg-gray-300 h-64 rounded-md p-8',
        classeImg: 'max-h-full max-w-full object-contain mx-auto',
        descricao: 'Aplicação completa para gestão de finanças pessoais, com controle de despesas e receitas. Sendo um projeto pessoal, <b>sou o único Desenvovedor (Full-Stack)</b>, criando o layout, modelando o banco de dados e estruturando o Front e Back-End. Atualmente será de uso interno, mas planejo moldá-lo para um projeto público.',
        link: null,
        tecnologias: [
            { nome: 'React.js', img: './img/tecs/react.png' },
            { nome: 'Vite.js', img: './img/tecs/vite.png' },
            { nome: 'TypeScript', img: './img/tecs/ts.png' },
            { nome: 'PHP', img: './img/tecs/php.png' },
            { nome: 'MySQL', img: './img/tecs/mysql.png' },
            { nome: 'Docker', img: './img/tecs/docker.png' }
        ]
    },
    {
        nome: 'Planeja SJC',
        status: 'Concluído',
        statusColor: 'green',
        img: './img/PlanejaSJC.png',
        classeContainerImg: '',
        classeImg: 'w-full h-64 object-cover rounded mb-4',
        descricao: 'Plataforma de Gráficos interativos sobre os dados do Censo 2022 do município de São José dos Campos. Desenvolvido como Projeto Integrador na FATEC SJC, <b>tive minha participação como Product Owner & Back-End Developer</b>, responsável por, principalmente, estruturar a disposição dos gráficos.',
        link: 'https://github.com/OmniDevsOficial/API-Censo-2022',
        tecnologias: [
            { nome: 'HTML', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
            { nome: 'CSS', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
            { nome: 'MySQL', img: './img/tecs/mysql.png' },
            { nome: 'AWS', img: './img/tecs/aws.png' },
            { nome: 'Python', img: './img/tecs/python.png' },
            { nome: 'Flask', img: './img/tecs/flask.png' }
        ]
    }
];

export const certificacoes = [
    {
        nome: 'Técnico em Desenvolvimento de Sistemas',
        instituicao: 'SENAI Taubaté - 2023',
        link: null,
        icone: 'bi-filetype-pdf',
        corBotao: '',
        tooltip: 'Ver PDF'
    },
    {
        nome: 'Programação de Robôs Industriais',
        instituicao: 'SENAI Taubaté - 2023',
        link: null,
        icone: 'bi-filetype-pdf',
        corBotao: '',
        tooltip: 'Ver PDF'
    },
    {
        nome: 'AWS Academy Cloud Foundations',
        instituicao: 'Amazon Web Services - 2022',
        link: 'https://www.credly.com/badges/00fa832f-d2fc-415b-8ede-0e2e63e1f115/print',
        icone: 'bi-eye',
        corBotao: '!bg-blue-600',
        tooltip: 'Acessar Certificado'
    },
    {
        nome: 'Escola de Inovadores',
        instituicao: 'INOVA CPS - 2025',
        link: 'https://drive.google.com/file/d/1tV3KV7SpCNKKyRnOwVJj_p8aiaM-UUPr',
        icone: 'bi-filetype-pdf',
        corBotao: '',
        tooltip: 'Ver PDF'
    }
];
