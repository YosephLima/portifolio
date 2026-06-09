const adminPassword = 'admin';

export let isAdmin = false;

export function initAuth() {
    const loginTrigger = document.getElementById('admin-login-trigger');
    const loginModalElement = document.getElementById('login-modal');
    const loginForm = document.getElementById('login-form');
    const loginFeedback = document.getElementById('login-feedback');
    const habilidadesEditarBtn = document.getElementById('habilidades-editar-btn');

    if (loginTrigger && loginModalElement) {
        const loginModal = new bootstrap.Modal(loginModalElement);

        loginTrigger.addEventListener('click', () => {
            if (!isAdmin) {
                if (loginFeedback) loginFeedback.innerHTML = '';
                loginModal.show();
            } else {
                // Futuramente pode haver um modal/toast indicando que já está logado ou perguntando se quer sair
            }
        });

        if (loginForm) {
            loginForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const passwordInput = document.getElementById('admin-password');
                const password = passwordInput ? passwordInput.value : '';

                if (password === adminPassword) {
                    isAdmin = true;
                    loginModal.hide();
                    loginForm.reset();
                    
                    // Revela todos os botões administrativos
                    const editBtns = document.querySelectorAll('.habilidades-edit-btn');
                    editBtns.forEach(btn => btn.classList.remove('d-none'));
                } else {
                    if (loginFeedback) {
                        loginFeedback.innerHTML = '<div class="alert alert-danger py-2 mb-0">Senha incorreta.</div>';
                    }
                }
            });
        }
    }
}
