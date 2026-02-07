(async function() {
    try {
        const loginLink = document.getElementById('menu-login');
        if (!loginLink) return;

        // Primeiro verificar se há usuário no localStorage (login via cliente)
        const stored = localStorage.getItem('user');
        let user = null;
        if (stored) {
            try { user = JSON.parse(stored); } catch(e) { user = null; }
        }

        // Se não houver localStorage, tentar endpoint de sessão (/api/me)
        if (!user) {
            const res = await fetch('/api/me', { credentials: 'include' });
            if (res.ok) {
                user = await res.json();
            }
        }

        if (!user) return; // não autenticado

        const profileLink = document.createElement('a');
        profileLink.href = '/dashboard.html';
        profileLink.className = 'text-menu menu-user';

        const img = document.createElement('img');
        img.src = user.foto ? (user.foto.startsWith('/') ? user.foto : user.foto) : '/img/default-profile.svg';
        img.alt = user.nome || 'Perfil';
        img.className = 'menu-avatar';
        img.style.width = '32px';
        img.style.height = '32px';
        img.style.borderRadius = '50%';
        img.style.objectFit = 'cover';
        img.style.verticalAlign = 'middle';
        img.style.marginRight = '8px';

        profileLink.appendChild(img);
        const span = document.createElement('span');
        span.textContent = user.nome || 'Perfil';
        profileLink.appendChild(span);

        // Criar link de logout com ícone
        const logoutLink = document.createElement('a');
        logoutLink.href = '/logout';
        logoutLink.className = 'text-menu logout-link';
        logoutLink.style.marginLeft = '8px';
        logoutLink.title = 'Sair';
        logoutLink.innerHTML = `
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 13v-2H7V8l-5 4 5 4v-3zM20 3h-8v2h8v14h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
            </svg>
            <span class="sr-only">Sair</span>
        `;

        // Criar dropdown com botão (avatar+nome) e opções
        const dropdown = document.createElement('div');
        dropdown.className = 'menu-user-dropdown';

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'menu-user-btn';
        btn.setAttribute('aria-haspopup', 'true');
        btn.setAttribute('aria-expanded', 'false');
        // colocar o profileLink conteúdo dentro do botão
        btn.appendChild(img.cloneNode(true));
        const nameSpan = document.createElement('span');
        nameSpan.textContent = user.nome || 'Perfil';
        nameSpan.className = 'menu-user-name';
        nameSpan.style.marginLeft = '8px';
        btn.appendChild(nameSpan);

        const options = document.createElement('ul');
        options.className = 'menu-user-options';
        options.setAttribute('role', 'menu');

        const optProfile = document.createElement('li');
        optProfile.innerHTML = `<a href="/profile.html" role="menuitem" class="menu-user-option">Perfil</a>`;
        const optDashboard = document.createElement('li');
        optDashboard.innerHTML = `<a href="/dashboard.html" role="menuitem" class="menu-user-option">Dashboard</a>`;
        const optLogout = document.createElement('li');
        optLogout.innerHTML = `<a href="/logout" role="menuitem" class="menu-user-option">Sair</a>`;

        options.appendChild(optProfile);
        options.appendChild(optDashboard);
        options.appendChild(optLogout);

        dropdown.appendChild(btn);
        dropdown.appendChild(options);

        // Logout client-side: limpar localStorage e redirecionar
        const logoutAnchor = optLogout.querySelector('a');
        if (logoutAnchor) {
            logoutAnchor.addEventListener('click', (e) => {
                e.preventDefault();
                try { localStorage.removeItem('user'); } catch (err) {}
                // tentar notificar servidor (pode não existir sessão)
                fetch('/logout').finally(() => window.location.href = '/');
            });
        }

        // Substituir link de login pelo dropdown
        loginLink.parentElement.replaceChild(dropdown, loginLink);

        // Handlers: toggle e fechar ao clicar fora
        function closeDropdown() {
            dropdown.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
        }

        function openDropdown() {
            dropdown.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
        }

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (dropdown.classList.contains('open')) closeDropdown(); else openDropdown();
        });

        // fechar ao clicar fora
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) closeDropdown();
        });

        // fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeDropdown();
        });
    } catch (e) {
        console.error('menu.js error', e);
    }
})();
