// Para forçar um modo específico, altere FORCE_MOCK para true ou false.
// null = auto-detect: localhost → backend, qualquer outra origem → mock (GitHub Pages).
const FORCE_MOCK = null;

const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);

export const USE_MOCK = FORCE_MOCK !== null ? FORCE_MOCK : !isLocalhost;
export const BACKEND_PORT = 3001;
export const BACKEND_URL = `http://localhost:${BACKEND_PORT}`;
