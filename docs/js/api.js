import { USE_MOCK, BACKEND_URL } from './config.js';
import * as mockData from './data.js';

export const store = {
    apresentacao: {},
    formacao: [],
    experiencias: [],
    habilidades: [],
    projetos: [],
    certificacoes: [],
};

// Registros planos com IDs — usados internamente para PUT/DELETE
export const raw = {
    habilidades: [],
    experiencias: [],
};

async function apiFetch(path, options = {}) {
    const res = await fetch(`${BACKEND_URL}${path}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });
    if (!res.ok) throw new Error(`Erro na API: ${res.status} ${res.statusText}`);
    if (res.status === 204) return null;
    return res.json();
}

// --- ORDENAÇÃO ---

function sortFormacaoDesc(list) {
    return [...list].sort((a, b) => b.inicio - a.inicio);
}

const MESES_PT = { jan: 0, fev: 1, mar: 2, abr: 3, mai: 4, jun: 5, jul: 6, ago: 7, set: 8, out: 9, nov: 10, dez: 11 };

function parseMonthYear(str) {
    if (!str || str.toLowerCase() === 'presente') return Infinity;
    const [mes, ano] = str.trim().split(' ');
    return (parseInt(ano, 10) || 0) * 12 + (MESES_PT[mes?.toLowerCase()] ?? 0);
}

function sortExperienciasDesc(list) {
    return [...list].sort((a, b) => parseMonthYear(b.inicio) - parseMonthYear(a.inicio));
}

function rebuildExperiencias() {
    raw.experiencias = sortExperienciasDesc(raw.experiencias);
    store.experiencias = raw.experiencias.map(exp => ({ trabalhos: [exp] }));
}

// --- AGRUPAMENTO ---

function groupHabilidades(habs) {
    const map = new Map();
    habs.forEach(h => {
        if (!map.has(h.categoria)) map.set(h.categoria, { categoria: h.categoria, items: [] });
        map.get(h.categoria).items.push(h);
    });
    return [...map.values()];
}

// --- MOCK ---

function loadMock() {
    store.apresentacao = mockData.apresentacao;
    store.formacao = sortFormacaoDesc(mockData.formacao);
    store.experiencias = mockData.experiencias;
    store.habilidades = mockData.habilidades;
    store.projetos = mockData.projetos;
    store.certificacoes = mockData.certificacoes;
}

// --- LOAD ALL ---

export async function loadAll() {
    if (USE_MOCK) {
        loadMock();
        return;
    }

    const [apresentacao, formacao, exps, habs, projetos, certificacoes] = await Promise.all([
        apiFetch('/apresentacao/1'),
        apiFetch('/formacoes'),
        apiFetch('/experiencias'),
        apiFetch('/habilidades'),
        apiFetch('/projetos'),
        apiFetch('/certificacoes'),
    ]);

    store.apresentacao = apresentacao;
    store.formacao = sortFormacaoDesc(formacao);
    store.projetos = projetos;
    store.certificacoes = certificacoes;

    raw.experiencias = exps;
    rebuildExperiencias();

    raw.habilidades = habs;
    store.habilidades = groupHabilidades(habs);
}

// --- APRESENTACAO ---
export async function updateApresentacao(data) {
    const updated = await apiFetch('/apresentacao/1', { method: 'PUT', body: JSON.stringify(data) });
    store.apresentacao = updated;
    return updated;
}

// --- FORMACAO ---
export async function createFormacao(data) {
    const created = await apiFetch('/formacoes', { method: 'POST', body: JSON.stringify(data) });
    if (created.status) {
        store.formacao.forEach(f => { f.status = false; });
    }
    store.formacao.push(created);
    store.formacao = sortFormacaoDesc(store.formacao);
    return created;
}
export async function updateFormacao(id, data) {
    const updated = await apiFetch(`/formacoes/${id}`, { method: 'PUT', body: JSON.stringify(data) });
    if (updated.status) {
        store.formacao.forEach(f => { if (f.id !== id) f.status = false; });
    }
    const idx = store.formacao.findIndex(f => f.id === id);
    if (idx !== -1) store.formacao[idx] = updated;
    store.formacao = sortFormacaoDesc(store.formacao);
    return updated;
}
export async function deleteFormacao(id) {
    await apiFetch(`/formacoes/${id}`, { method: 'DELETE' });
    store.formacao = sortFormacaoDesc(store.formacao.filter(f => f.id !== id));
}

// --- EXPERIENCIA ---
export async function createExperiencia(data) {
    const created = await apiFetch('/experiencias', { method: 'POST', body: JSON.stringify(data) });
    if (created.atual) {
        raw.experiencias.forEach(e => { e.atual = false; });
    }
    raw.experiencias.push(created);
    rebuildExperiencias();
    return created;
}
export async function updateExperiencia(id, data) {
    const updated = await apiFetch(`/experiencias/${id}`, { method: 'PUT', body: JSON.stringify(data) });
    if (updated.atual) {
        raw.experiencias.forEach(e => { if (e.id !== id) e.atual = false; });
    }
    const idx = raw.experiencias.findIndex(e => e.id === id);
    if (idx !== -1) raw.experiencias[idx] = updated;
    rebuildExperiencias();
    return updated;
}
export async function deleteExperiencia(id) {
    raw.experiencias = raw.experiencias.filter(e => e.id !== id);
    await apiFetch(`/experiencias/${id}`, { method: 'DELETE' });
    rebuildExperiencias();
}

// --- HABILIDADE ---
export async function createHabilidade(data) {
    const created = await apiFetch('/habilidades', { method: 'POST', body: JSON.stringify(data) });
    raw.habilidades.push(created);
    store.habilidades = groupHabilidades(raw.habilidades);
    return created;
}
export async function updateHabilidade(id, data) {
    const updated = await apiFetch(`/habilidades/${id}`, { method: 'PUT', body: JSON.stringify(data) });
    const idx = raw.habilidades.findIndex(h => h.id === id);
    if (idx !== -1) raw.habilidades[idx] = updated;
    store.habilidades = groupHabilidades(raw.habilidades);
    return updated;
}
export async function deleteHabilidade(id) {
    raw.habilidades = raw.habilidades.filter(h => h.id !== id);
    await apiFetch(`/habilidades/${id}`, { method: 'DELETE' });
    store.habilidades = groupHabilidades(raw.habilidades);
}

// --- PROJETO ---
export async function createProjeto(data) {
    const created = await apiFetch('/projetos', { method: 'POST', body: JSON.stringify(data) });
    store.projetos.unshift(created);
    return created;
}
export async function updateProjeto(id, data) {
    const updated = await apiFetch(`/projetos/${id}`, { method: 'PUT', body: JSON.stringify(data) });
    const idx = store.projetos.findIndex(p => p.id === id);
    if (idx !== -1) store.projetos[idx] = updated;
    return updated;
}
export async function deleteProjeto(id) {
    store.projetos = store.projetos.filter(p => p.id !== id);
    await apiFetch(`/projetos/${id}`, { method: 'DELETE' });
}

// --- CERTIFICACAO ---
export async function createCertificacao(data) {
    const created = await apiFetch('/certificacoes', { method: 'POST', body: JSON.stringify(data) });
    store.certificacoes.push(created);
    return created;
}
export async function updateCertificacao(id, data) {
    const updated = await apiFetch(`/certificacoes/${id}`, { method: 'PUT', body: JSON.stringify(data) });
    const idx = store.certificacoes.findIndex(c => c.id === id);
    if (idx !== -1) store.certificacoes[idx] = updated;
    return updated;
}
export async function deleteCertificacao(id) {
    store.certificacoes = store.certificacoes.filter(c => c.id !== id);
    await apiFetch(`/certificacoes/${id}`, { method: 'DELETE' });
}
