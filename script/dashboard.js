async function carregarUsuario() {
    const response = await fetch("/api/me", {
        credentials: "include"
    });

    if (!response.ok) {
        window.location.href = "/login.html";
        return;
    }

    const user = await response.json();

    // debug log removed

    const h1 = document.querySelector("h1");
    const nameEl = document.querySelector(".name");
    const emailEl = document.querySelector(".email");
    const imgEl = document.querySelector(".container img") || document.querySelector("img");

    if (h1) h1.textContent = `Bem vindo, ${user.nome || 'Usuário'}!`;
    if (nameEl) nameEl.textContent = user.nome || '';
    if (emailEl) emailEl.textContent = user.email || '';
    if (imgEl) {
        // Usar endpoint /avatar para servir a imagem via proxy quando houver foto no usuário
        const fallback = '/img/default-profile.svg';
        const src = user.foto ? '/avatar' : fallback;

        // debug log removed

        const pre = new Image();
        pre.onload = () => {
            imgEl.src = src;
        };
        pre.onerror = () => {
            console.error('dashboard.js - erro ao carregar imagem:', src);
            imgEl.src = fallback;
        };
        pre.src = src;

        imgEl.alt = user.nome ? `Foto de ${user.nome}` : 'Foto do usuário';
    }
}

carregarUsuario();