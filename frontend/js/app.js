import { renderApresentacao, renderFormacao, renderExperiencias, renderHabilidades, renderProjetos, renderCertificacoes } from './render.js';
import { initAdmin } from './admin.js';
import { initAuth } from './auth.js';
import { loadAll } from './api.js';

async function init() {
    await loadAll();

    renderApresentacao();
    renderFormacao();
    renderExperiencias();
    renderHabilidades();
    renderProjetos();
    renderCertificacoes();

    initAdmin();
    initAuth();
}

init();
