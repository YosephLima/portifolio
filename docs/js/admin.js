import { store, createFormacao, updateFormacao, deleteFormacao, createExperiencia, updateExperiencia, deleteExperiencia, createHabilidade, updateHabilidade, deleteHabilidade, createProjeto, updateProjeto, deleteProjeto, createCertificacao, updateCertificacao, deleteCertificacao, updateApresentacao } from './api.js';
import { renderApresentacao, renderFormacao, renderExperiencias, renderHabilidades, renderProjetos, renderCertificacoes } from './render.js';

function parsePeriodo(periodoStr) {
    const [inicio, ...restFim] = periodoStr.split(' - ');
    return { inicio: inicio.trim(), fim: restFim.join(' - ').trim() || 'Presente' };
}

// IDs dos registros sendo editados no momento
const editingIds = {};

export function initAdmin() {
    // ----------------------------------------------------
    // HABILIDADES
    // ----------------------------------------------------
    const habilidadesEditBtn = document.getElementById('habilidades-editar-btn');
    const habilidadeModalElement = document.getElementById('habilidade-modal');
    const habilidadeForm = document.getElementById('habilidade-form');
    const habilidadeFeedback = document.getElementById('habilidade-feedback');

    if (habilidadesEditBtn && habilidadeModalElement) {
        const habilidadeModal = new bootstrap.Modal(habilidadeModalElement);
        habilidadesEditBtn.addEventListener('click', () => {
            if (habilidadeFeedback) habilidadeFeedback.innerHTML = '';
            habilidadeModal.show();
        });

        if (habilidadeForm) {
            habilidadeForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                const categoria = document.getElementById('habilidade-categoria')?.value.trim();
                const nome = document.getElementById('habilidade-nome')?.value.trim();
                const img = document.getElementById('habilidade-img')?.value.trim();

                if (!categoria || !nome || !img) {
                    habilidadeFeedback.innerHTML = '<div class="alert alert-warning py-2 mb-0">Preencha todos os campos obrigatórios.</div>';
                    return;
                }
                try {
                    await createHabilidade({ nome, img, categoria });
                    renderHabilidades();
                    habilidadeForm.reset();
                    habilidadeFeedback.innerHTML = '<div class="alert alert-success py-2 mb-0">Adicionado com sucesso!</div>';
                } catch {
                    habilidadeFeedback.innerHTML = '<div class="alert alert-danger py-2 mb-0">Erro ao salvar. Tente novamente.</div>';
                }
            });
        }
    }

    // ----------------------------------------------------
    // FORMAÇÃO
    // ----------------------------------------------------
    const formacaoEditBtn = document.getElementById('formacao-editar-btn');
    const formacaoModalElement = document.getElementById('formacao-modal');
    const formacaoForm = document.getElementById('formacao-form');
    const formacaoFeedback = document.getElementById('formacao-feedback');

    if (formacaoEditBtn && formacaoModalElement) {
        const formacaoModal = new bootstrap.Modal(formacaoModalElement);
        formacaoEditBtn.addEventListener('click', () => {
            if (formacaoFeedback) formacaoFeedback.innerHTML = '';
            formacaoModal.show();
        });

        if (formacaoForm) {
            formacaoForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                const nome = document.getElementById('formacao-nome')?.value.trim();
                const local = document.getElementById('formacao-local')?.value.trim();
                const periodoStr = document.getElementById('formacao-periodo')?.value.trim();
                const status = document.getElementById('formacao-cursando')?.checked || false;

                if (!nome || !local || !periodoStr) {
                    formacaoFeedback.innerHTML = '<div class="alert alert-warning py-2 mb-0">Preencha todos os campos obrigatórios.</div>';
                    return;
                }

                const [inicioStr, fimStr] = periodoStr.split(' - ');
                try {
                    await createFormacao({ nome, local, inicio: parseInt(inicioStr, 10) || 0, fim: parseInt(fimStr, 10) || 0, status });
                    renderFormacao();
                    formacaoForm.reset();
                    formacaoFeedback.innerHTML = '<div class="alert alert-success py-2 mb-0">Adicionado com sucesso!</div>';
                } catch {
                    formacaoFeedback.innerHTML = '<div class="alert alert-danger py-2 mb-0">Erro ao salvar. Tente novamente.</div>';
                }
            });
        }
    }

    // ----------------------------------------------------
    // EXPERIÊNCIA
    // ----------------------------------------------------
    const experienciaEditBtn = document.getElementById('experiencia-editar-btn');
    const experienciaModalElement = document.getElementById('experiencia-modal');
    const experienciaForm = document.getElementById('experiencia-form');
    const experienciaFeedback = document.getElementById('experiencia-feedback');

    if (experienciaEditBtn && experienciaModalElement) {
        const experienciaModal = new bootstrap.Modal(experienciaModalElement);
        experienciaEditBtn.addEventListener('click', () => {
            if (experienciaFeedback) experienciaFeedback.innerHTML = '';
            experienciaModal.show();
        });

        if (experienciaForm) {
            experienciaForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                const cargo = document.getElementById('exp-cargo')?.value.trim();
                const empresa = document.getElementById('exp-empresa')?.value.trim();
                const periodoStr = document.getElementById('exp-periodo')?.value.trim();
                const descricao = document.getElementById('exp-descricao')?.value.trim();
                const tecnologiasStr = document.getElementById('exp-tecnologias')?.value.trim();
                const atual = document.getElementById('exp-atual')?.checked || false;

                if (!cargo || !empresa || !periodoStr || !descricao || !tecnologiasStr) {
                    experienciaFeedback.innerHTML = '<div class="alert alert-warning py-2 mb-0">Preencha todos os campos obrigatórios.</div>';
                    return;
                }

                const { inicio, fim } = parsePeriodo(periodoStr);
                const tecnologias = tecnologiasStr.split(',').map(t => t.trim()).filter(Boolean);

                try {
                    await createExperiencia({ nome: cargo, local: empresa, inicio, fim, descricao, tecnologias, atual });
                    renderExperiencias();
                    experienciaForm.reset();
                    experienciaFeedback.innerHTML = '<div class="alert alert-success py-2 mb-0">Adicionado com sucesso!</div>';
                } catch {
                    experienciaFeedback.innerHTML = '<div class="alert alert-danger py-2 mb-0">Erro ao salvar. Tente novamente.</div>';
                }
            });
        }
    }

    // ----------------------------------------------------
    // PROJETOS
    // ----------------------------------------------------
    const projetosEditBtn = document.getElementById('projetos-editar-btn');
    const projetosModalElement = document.getElementById('projetos-modal');
    const projetosForm = document.getElementById('projetos-form');
    const projetosFeedback = document.getElementById('projetos-feedback');

    if (projetosEditBtn && projetosModalElement) {
        const projetosModal = new bootstrap.Modal(projetosModalElement);
        projetosEditBtn.addEventListener('click', () => {
            if (projetosFeedback) projetosFeedback.innerHTML = '';
            projetosModal.show();
        });

        if (projetosForm) {
            projetosForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                const titulo = document.getElementById('proj-nome')?.value.trim();
                const finalizado = document.getElementById('proj-finalizado')?.checked || false;
                const img = document.getElementById('proj-img')?.value.trim();
                const descricao = document.getElementById('proj-descricao')?.value.trim();
                const link = document.getElementById('proj-link')?.value.trim() || null;
                const techStr = document.getElementById('proj-tecnologias')?.value.trim() || '';

                if (!titulo || !img || !descricao) {
                    projetosFeedback.innerHTML = '<div class="alert alert-warning py-2 mb-0">Preencha os campos obrigatórios.</div>';
                    return;
                }

                const tecnologias = techStr.split(',').map(t => t.trim()).filter(Boolean);
                try {
                    await createProjeto({ titulo, finalizado, img, descricao, link, tecnologias });
                    renderProjetos();
                    projetosForm.reset();
                    projetosFeedback.innerHTML = '<div class="alert alert-success py-2 mb-0">Adicionado com sucesso!</div>';
                } catch {
                    projetosFeedback.innerHTML = '<div class="alert alert-danger py-2 mb-0">Erro ao salvar. Tente novamente.</div>';
                }
            });
        }
    }

    // ----------------------------------------------------
    // CERTIFICAÇÕES
    // ----------------------------------------------------
    const certificacoesEditBtn = document.getElementById('certificacoes-editar-btn');
    const certificacoesModalElement = document.getElementById('certificacoes-modal');
    const certificacoesForm = document.getElementById('certificacoes-form');
    const certificacoesFeedback = document.getElementById('certificacoes-feedback');

    if (certificacoesEditBtn && certificacoesModalElement) {
        const certificacoesModal = new bootstrap.Modal(certificacoesModalElement);
        certificacoesEditBtn.addEventListener('click', () => {
            if (certificacoesFeedback) certificacoesFeedback.innerHTML = '';
            certificacoesModal.show();
        });

        if (certificacoesForm) {
            certificacoesForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                const nome = document.getElementById('cert-nome')?.value.trim();
                const instituicao = document.getElementById('cert-instituicao')?.value.trim();
                const ano = parseInt(document.getElementById('cert-ano')?.value) || new Date().getFullYear();
                const url = document.getElementById('cert-url')?.value.trim() || null;

                if (!nome || !instituicao) {
                    certificacoesFeedback.innerHTML = '<div class="alert alert-warning py-2 mb-0">Preencha os campos obrigatórios.</div>';
                    return;
                }

                try {
                    await createCertificacao({ nome, instituicao, ano, url });
                    renderCertificacoes();
                    certificacoesForm.reset();
                    certificacoesFeedback.innerHTML = '<div class="alert alert-success py-2 mb-0">Adicionado com sucesso!</div>';
                } catch {
                    certificacoesFeedback.innerHTML = '<div class="alert alert-danger py-2 mb-0">Erro ao salvar. Tente novamente.</div>';
                }
            });
        }
    }

    // --- LISTENERS DE EDIÇÃO E EXCLUSÃO ---

    // APRESENTAÇÃO
    const apresentacaoEditForm = document.getElementById('apresentacao-edit-form');
    if (apresentacaoEditForm) {
        apresentacaoEditForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const titulo = document.getElementById('apresentacao-edit-titulo').value.trim();
            const texto_completo = document.getElementById('apresentacao-edit-texto-completo').value.trim();
            const texto_negrito = document.getElementById('apresentacao-edit-texto-negrito').value.trim();
            try {
                await updateApresentacao({ titulo, texto_negrito, texto_completo });
                renderApresentacao();
                bootstrap.Modal.getInstance(document.getElementById('apresentacao-edit-modal')).hide();
            } catch {
                alert('Erro ao salvar apresentação.');
            }
        });
    }

    // HABILIDADES
    const habilidadeEditForm = document.getElementById('habilidade-edit-form');
    if (habilidadeEditForm) {
        habilidadeEditForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const id = editingIds.habilidade;
            const i = parseInt(document.getElementById('habilidade-edit-cat-index').value);
            const nome = document.getElementById('habilidade-edit-nome').value.trim();
            const img = document.getElementById('habilidade-edit-img').value.trim();
            const categoria = store.habilidades[i]?.categoria;
            try {
                await updateHabilidade(id, { nome, img, categoria });
                renderHabilidades();
                bootstrap.Modal.getInstance(document.getElementById('habilidade-edit-modal')).hide();
            } catch {
                alert('Erro ao salvar habilidade.');
            }
        });
        document.getElementById('habilidade-delete-btn')?.addEventListener('click', async () => {
            const id = editingIds.habilidade;
            try {
                await deleteHabilidade(id);
                renderHabilidades();
                bootstrap.Modal.getInstance(document.getElementById('habilidade-edit-modal')).hide();
            } catch {
                alert('Erro ao excluir habilidade.');
            }
        });
    }

    // FORMAÇÃO
    const formacaoEditForm = document.getElementById('formacao-edit-form');
    if (formacaoEditForm) {
        formacaoEditForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const id = editingIds.formacao;
            const periodoVal = document.getElementById('formacao-edit-periodo').value.trim();
            const [iniStr, fimStr] = periodoVal.split(' - ');
            const nome = document.getElementById('formacao-edit-nome').value.trim();
            const local = document.getElementById('formacao-edit-local').value.trim();
            const inicio = parseInt(iniStr, 10);
            const fim = parseInt(fimStr, 10);
            const status = document.getElementById('formacao-edit-cursando').checked;
            try {
                await updateFormacao(id, { nome, local, inicio, fim, status });
                renderFormacao();
                bootstrap.Modal.getInstance(document.getElementById('formacao-edit-modal')).hide();
            } catch {
                alert('Erro ao salvar formação.');
            }
        });
        document.getElementById('formacao-delete-btn')?.addEventListener('click', async () => {
            const id = editingIds.formacao;
            try {
                await deleteFormacao(id);
                renderFormacao();
                bootstrap.Modal.getInstance(document.getElementById('formacao-edit-modal')).hide();
            } catch {
                alert('Erro ao excluir formação.');
            }
        });
    }

    // EXPERIÊNCIA
    const experienciaEditForm = document.getElementById('experiencia-edit-form');
    if (experienciaEditForm) {
        experienciaEditForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const id = editingIds.experiencia;
            const periodoVal = document.getElementById('experiencia-edit-periodo').value.trim();
            const { inicio, fim } = parsePeriodo(periodoVal);
            const techVal = document.getElementById('experiencia-edit-tecnologias').value.trim();
            const nome = document.getElementById('experiencia-edit-cargo').value.trim();
            const local = document.getElementById('experiencia-edit-empresa').value.trim();
            const descricao = document.getElementById('experiencia-edit-descricao').value.trim();
            const tecnologias = techVal.split(',').map(t => t.trim()).filter(Boolean);
            const atual = document.getElementById('experiencia-edit-atual').checked;
            try {
                await updateExperiencia(id, { nome, local, inicio, fim, descricao, tecnologias, atual });
                renderExperiencias();
                bootstrap.Modal.getInstance(document.getElementById('experiencia-edit-modal')).hide();
            } catch {
                alert('Erro ao salvar experiência.');
            }
        });
        document.getElementById('experiencia-delete-btn')?.addEventListener('click', async () => {
            const id = editingIds.experiencia;
            try {
                await deleteExperiencia(id);
                renderExperiencias();
                bootstrap.Modal.getInstance(document.getElementById('experiencia-edit-modal')).hide();
            } catch {
                alert('Erro ao excluir experiência.');
            }
        });
    }

    // PROJETOS
    const projetosEditForm = document.getElementById('projetos-edit-form');
    if (projetosEditForm) {
        projetosEditForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const id = editingIds.projeto;
            const techStr = document.getElementById('projetos-edit-tecnologias').value.trim();
            const titulo = document.getElementById('projetos-edit-titulo').value.trim();
            const finalizado = document.getElementById('projetos-edit-finalizado')?.checked || false;
            const img = document.getElementById('projetos-edit-img').value.trim();
            const descricao = document.getElementById('projetos-edit-descricao').value.trim();
            const link = document.getElementById('projetos-edit-link').value.trim() || null;
            const tecnologias = techStr.split(',').map(t => t.trim()).filter(Boolean);
            try {
                await updateProjeto(id, { titulo, finalizado, img, descricao, link, tecnologias });
                renderProjetos();
                bootstrap.Modal.getInstance(document.getElementById('projetos-edit-modal')).hide();
            } catch {
                alert('Erro ao salvar projeto.');
            }
        });
        document.getElementById('projetos-delete-btn')?.addEventListener('click', async () => {
            const id = editingIds.projeto;
            try {
                await deleteProjeto(id);
                renderProjetos();
                bootstrap.Modal.getInstance(document.getElementById('projetos-edit-modal')).hide();
            } catch {
                alert('Erro ao excluir projeto.');
            }
        });
    }

    // CERTIFICAÇÕES
    const certificacoesEditForm = document.getElementById('certificacoes-edit-form');
    if (certificacoesEditForm) {
        certificacoesEditForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const id = editingIds.certificacao;
            const nome = document.getElementById('certificacoes-edit-nome').value.trim();
            const instituicao = document.getElementById('certificacoes-edit-instituicao').value.trim();
            const ano = parseInt(document.getElementById('certificacoes-edit-ano')?.value);
            const url = document.getElementById('certificacoes-edit-url')?.value.trim() || null;
            try {
                await updateCertificacao(id, { nome, instituicao, ano, url });
                renderCertificacoes();
                bootstrap.Modal.getInstance(document.getElementById('certificacoes-edit-modal')).hide();
            } catch {
                alert('Erro ao salvar certificação.');
            }
        });
        document.getElementById('certificacoes-delete-btn')?.addEventListener('click', async () => {
            const id = editingIds.certificacao;
            try {
                await deleteCertificacao(id);
                renderCertificacoes();
                bootstrap.Modal.getInstance(document.getElementById('certificacoes-edit-modal')).hide();
            } catch {
                alert('Erro ao excluir certificação.');
            }
        });
    }
}

// Função global para abrir modal de edição
window.abrirEdicao = function(tipo, i, j) {
    if (tipo === 'apresentacao') {
        const a = store.apresentacao;
        document.getElementById('apresentacao-edit-titulo').value = a.titulo;
        document.getElementById('apresentacao-edit-texto-completo').value = a.texto_completo;
        document.getElementById('apresentacao-edit-texto-negrito').value = a.texto_negrito || '';
        new bootstrap.Modal(document.getElementById('apresentacao-edit-modal')).show();

    } else if (tipo === 'habilidade') {
        const item = store.habilidades[i].items[j];
        editingIds.habilidade = item.id;
        document.getElementById('habilidade-edit-cat-index').value = i;
        document.getElementById('habilidade-edit-item-index').value = j;
        document.getElementById('habilidade-edit-nome').value = item.nome;
        document.getElementById('habilidade-edit-img').value = item.img;
        new bootstrap.Modal(document.getElementById('habilidade-edit-modal')).show();

    } else if (tipo === 'formacao') {
        const item = store.formacao[i];
        editingIds.formacao = item.id;
        document.getElementById('formacao-edit-index').value = i;
        document.getElementById('formacao-edit-nome').value = item.nome;
        document.getElementById('formacao-edit-local').value = item.local;
        document.getElementById('formacao-edit-periodo').value = `${item.inicio} - ${item.fim}`;
        document.getElementById('formacao-edit-cursando').checked = item.status;
        new bootstrap.Modal(document.getElementById('formacao-edit-modal')).show();

    } else if (tipo === 'experiencia') {
        const item = store.experiencias[i].trabalhos[j];
        editingIds.experiencia = item.id;
        document.getElementById('experiencia-edit-cat-index').value = i;
        document.getElementById('experiencia-edit-item-index').value = j;
        document.getElementById('experiencia-edit-cargo').value = item.nome;
        document.getElementById('experiencia-edit-empresa').value = item.local;
        document.getElementById('experiencia-edit-periodo').value = `${item.inicio} - ${item.fim}`;
        document.getElementById('experiencia-edit-descricao').value = item.descricao;
        document.getElementById('experiencia-edit-tecnologias').value = Array.isArray(item.tecnologias) ? item.tecnologias.join(', ') : item.tecnologias;
        document.getElementById('experiencia-edit-atual').checked = item.atual;
        new bootstrap.Modal(document.getElementById('experiencia-edit-modal')).show();

    } else if (tipo === 'projeto') {
        const item = store.projetos[i];
        editingIds.projeto = item.id;
        document.getElementById('projetos-edit-index').value = i;
        document.getElementById('projetos-edit-titulo').value = item.titulo;
        if (document.getElementById('projetos-edit-finalizado'))
            document.getElementById('projetos-edit-finalizado').checked = item.finalizado;
        document.getElementById('projetos-edit-img').value = item.img;
        document.getElementById('projetos-edit-descricao').value = item.descricao;
        document.getElementById('projetos-edit-link').value = item.link || '';
        document.getElementById('projetos-edit-tecnologias').value = Array.isArray(item.tecnologias) ? item.tecnologias.join(', ') : item.tecnologias;
        new bootstrap.Modal(document.getElementById('projetos-edit-modal')).show();

    } else if (tipo === 'certificacao') {
        const item = store.certificacoes[i];
        editingIds.certificacao = item.id;
        document.getElementById('certificacoes-edit-index').value = i;
        document.getElementById('certificacoes-edit-nome').value = item.nome;
        document.getElementById('certificacoes-edit-instituicao').value = item.instituicao;
        if (document.getElementById('certificacoes-edit-ano'))
            document.getElementById('certificacoes-edit-ano').value = item.ano;
        if (document.getElementById('certificacoes-edit-url'))
            document.getElementById('certificacoes-edit-url').value = item.url || '';
        new bootstrap.Modal(document.getElementById('certificacoes-edit-modal')).show();
    }
};
