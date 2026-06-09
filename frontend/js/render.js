import { statusComponent } from './utils.js';
import { store } from './api.js';
import { isAdmin } from './auth.js';

const CATEGORIA_ICONS = {
    'Front-End': 'bi bi-code-slash',
    'Back-End': 'bi bi-server',
    'Ferramentas': 'bi bi-tools',
};

export function renderApresentacao() {
    const container = document.getElementById('apresentacao-container');
    if (!container) return;

    const { titulo, texto_negrito, texto_completo } = store.apresentacao;
    let textoRenderizado = texto_completo;
    if (texto_negrito && texto_completo.includes(texto_negrito)) {
        textoRenderizado = textoRenderizado.replace(texto_negrito, `<b>${texto_negrito}</b>`);
    }

    container.innerHTML = `
        <div class="card p-6" style="position: relative;">
            <button class="admin-edit-icon habilidades-edit-btn ${isAdmin ? '' : 'd-none'}" onclick="window.abrirEdicao('apresentacao')" title="Editar Apresentação">
                <i class="bi bi-pencil"></i>
            </button>
            <h2 class="text-3xl font-bold mb-4">${titulo}</h2>
            <p class="text-lg mb-0">${textoRenderizado}</p>
        </div>
    `;
}

export function renderFormacao() {
    const containerFormacao = document.getElementById('formacao-container');
    if (!containerFormacao) return;

    containerFormacao.innerHTML = store.formacao.map((curso, index) => `
         <div class="w-full">
            <div class="card p-4">
                <button class="admin-edit-icon habilidades-edit-btn ${isAdmin ? '' : 'd-none'}" onclick="window.abrirEdicao('formacao', ${index})" title="Editar Formação">
                    <i class="bi bi-pencil"></i>
                </button>
                <h5 class="text-xl font-semibold mb-2"><i class="bi bi-mortarboard-fill text-primary"></i>
                    ${curso.nome} ${curso.status ? (statusComponent('Cursando','green')): ''}</h5>
                <p class="m-0">${curso.local} | ${curso.inicio} - ${curso.fim}</p>
            </div>
        </div>
    `).join('');
}

export function renderExperiencias() {
    const containerExperiencia = document.getElementById('experiencia-container');
    if (!containerExperiencia) return;

    containerExperiencia.innerHTML = store.experiencias.map((card, i) => `
        <div class="w-full">
            <div class="card p-4">
                ${card.trabalhos.map((trabalho, j) => `
                    <div style="position: relative;">
                        <button class="admin-edit-icon habilidades-edit-btn ${isAdmin ? '' : 'd-none'}" onclick="window.abrirEdicao('experiencia', ${i}, ${j})" title="Editar Experiência">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <h5 class="text-xl font-semibold mb-2">
                            ${trabalho.nome} - ${trabalho.local}
                            ${trabalho.atual ? statusComponent('Atual', 'green') : ''}
                        </h5>
                        <p class="text-sm mb-2">${trabalho.inicio} - ${trabalho.fim}</p>
                        <p class="m-0 mb-2">${trabalho.descricao}</p>
                        <p class="mb-0"><strong>Tecnologias:</strong> ${trabalho.tecnologias.join(', ')}</p>
                    </div>
                `).join('<hr class="my-4 border-gray-600" />')} 
            </div>
        </div>
    `).join('');
}

export function renderHabilidades() {
    const containerHabilidades = document.getElementById('habilidades-container');
    if (!containerHabilidades) return;
    
    const getIcon = (cat) => {
        if(cat === 'Front-End') return 'bi-code-slash';
        if(cat === 'Back-End') return 'bi-server';
        return 'bi-tools';
    };

    containerHabilidades.innerHTML = store.habilidades.map((categoria, i) => `
        <div class="col-md-4">
            <div class="card p-6 h-100">
                <h5 class="text-center text-xl font-semibold mb-4">
                    <i class="bi ${getIcon(categoria.categoria)}"></i> ${categoria.categoria}
                </h5>
                <div class="grid grid-cols-3 gap-3">
                    ${categoria.items.map((item, j) => `
                        <div class="tech-card" style="position: relative;">
                            <button class="admin-edit-icon habilidades-edit-btn ${isAdmin ? '' : 'd-none'}" style="top: 2px; right: 2px; width: 22px; height: 22px; font-size: 0.75rem; border-radius: 4px;" onclick="window.abrirEdicao('habilidade', ${i}, ${j})" title="Editar Habilidade">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <img src="${item.img}" alt="${item.nome}" class="tech-icon">
                            <span class="tech-name">${item.nome}</span>
                        </div>
                    `).join('')} 
                </div>
            </div>
        </div>
    `).join('');
}

export function renderProjetos() {
    const containerProjetos = document.getElementById('projetos-container');
    if (!containerProjetos) return;

    const badgeColors = [
        'bg-blue-500', 'bg-green-500', 'bg-red-500', 
        'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 
        'bg-teal-500', 'bg-orange-500', 'bg-cyan-500'
    ];

    containerProjetos.innerHTML = store.projetos.map((projeto, index) => {
        const statusText = projeto.finalizado ? 'Concluído' : 'Em Desenvolvimento';
        const statusColor = projeto.finalizado ? 'green' : 'yellow';

        // Embaralha as cores para este projeto específico
        const projectColors = [...badgeColors].sort(() => 0.5 - Math.random());

        return `
        <div class="col-md-6">
            <div class="card h-100">
                <button class="admin-edit-icon habilidades-edit-btn ${isAdmin ? '' : 'd-none'}" onclick="window.abrirEdicao('projeto', ${index})" title="Editar Projeto">
                    <i class="bi bi-pencil"></i>
                </button>
                <div class="card-body flex flex-col"> 
                    <h5 class="text-xl font-semibold mb-3 text-center"> 
                        ${projeto.titulo} 
                        ${statusComponent(statusText, statusColor)}
                    </h5>
                    
                    <img src="${projeto.img}" alt="${projeto.titulo}" class="w-full h-64 object-cover rounded mb-4">

                    <p class="mb-3 flex-grow">${projeto.descricao}</p> 
                    <p class="mb-2 font-semibold text-center mt-auto">Tecnologias:</p> 
                    <div class="flex flex-wrap gap-2 mb-4 items-center justify-center">
                        ${projeto.tecnologias.map((tech, i) => `
                            <span class="badge ${projectColors[i % projectColors.length]} text-white border-0">${tech}</span>
                        `).join('')}
                    </div>

                    <div class="text-center mt-3">
                        <a ${projeto.link ? `href="${projeto.link}" target="_blank"` : ''} 
                           style="text-decoration: none;"
                           class="${projeto.link ? '' : 'cursor-pointer'} inline-block px-8 py-2.5 bg-blue-500 hover:bg-blue-400 text-white rounded-lg font-semibold border-2 border-blue-400 shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
                           Acessar
                        </a>
                    </div>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

export function renderCertificacoes() {
    const containerCertificacoes = document.getElementById('certificacoes-container');
    if (!containerCertificacoes) return;

    containerCertificacoes.innerHTML = store.certificacoes.map((cert, index) => {
        const isLink = !!cert.url;
        const icone = isLink ? 'bi-eye' : 'bi-filetype-pdf';
        const corBotao = isLink ? '!bg-blue-600' : '';
        const tooltip = isLink ? 'Acessar Certificado' : 'Ver PDF';

        return `
        <div class="col-md-6">
            <div class="card p-4">
                <button class="admin-edit-icon habilidades-edit-btn ${isAdmin ? '' : 'd-none'}" onclick="window.abrirEdicao('certificacao', ${index})" title="Editar Certificação">
                    <i class="bi bi-pencil"></i>
                </button>
                <div class="flex justify-between items-center">
                    <div>
                        <h6 class="text-lg font-semibold mb-2">
                            <i class="bi bi-award-fill text-warning"></i> ${cert.nome}
                        </h6>
                        <p class="m-0">${cert.instituicao} - ${cert.ano}</p>
                    </div>
                    
                    <a ${isLink ? `href="${cert.url}" target="_blank" rel="noopener noreferrer"` : ''} 
                       class="cert-pdf-btn cursor-pointer ${corBotao}" 
                       title="${tooltip}">
                        <i class="bi ${icone}"></i>
                    </a>
                </div>
            </div>
        </div>
        `;
    }).join('');
}
