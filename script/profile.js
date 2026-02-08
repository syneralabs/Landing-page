const API_BASE = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
    const stored = localStorage.getItem('user');
    const notLogged = document.getElementById('not-logged');
    const profile = document.getElementById('profile');
    const nomeEl = document.getElementById('nome');
    const emailEl = document.getElementById('email');
    const cpfEl = document.getElementById('cpf');
    const avatar = document.getElementById('avatar');
    const uploadForm = document.getElementById('uploadForm');
    const fotoInput = document.getElementById('fotoInput');
    const uploadMsg = document.getElementById('upload-msg');

    if (!stored) {
        notLogged.style.display = 'block';
        profile.style.display = 'none';
        return;
    }

    let user;
    try { user = JSON.parse(stored); } catch (e) { user = null; }
    if (!user) {
        notLogged.style.display = 'block';
        profile.style.display = 'none';
        return;
    }

    // preencher campos
    nomeEl.textContent = user.nome || '';
    emailEl.textContent = user.email || '';
    cpfEl.textContent = user.cpf || '';
    if (user.foto) avatar.src = user.foto.startsWith('/') ? user.foto : user.foto;

    notLogged.style.display = 'none';
    profile.style.display = 'block';

    // se já tiver foto, esconder upload (opcional)
    if (user.foto) {
        document.getElementById('upload-hint').textContent = 'Você já possui uma foto de perfil.';
    }

    uploadForm.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        uploadMsg.textContent = '';
        if (!fotoInput.files || fotoInput.files.length === 0) return uploadMsg.textContent = 'Selecione um arquivo.';

        const file = fotoInput.files[0];
        const fd = new FormData();
        fd.append('foto', file);

        try {
            const res = await fetch(`${API_BASE}/clientes/upload-photo/${user.id}`, {
                method: 'POST',
                body: fd
            });

            if (!res.ok) {
                const txt = await res.text();
                uploadMsg.style.color = 'red';
                uploadMsg.textContent = 'Erro ao enviar: ' + (txt || res.statusText);
                return;
            }

            const json = await res.json();
            if (json.foto) {
                avatar.src = json.foto;
                uploadMsg.style.color = 'green';
                uploadMsg.textContent = 'Foto atualizada com sucesso.';
                // atualizar localStorage.user
                user.foto = json.foto;
                localStorage.setItem('user', JSON.stringify(user));
            } else {
                uploadMsg.style.color = 'red';
                uploadMsg.textContent = json.error || 'Resposta inesperada do servidor.';
            }
        } catch (err) {
            uploadMsg.style.color = 'red';
            // detectar erro de conexão comum no browser
            const msg = err && err.message ? err.message : String(err);
            if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('ECONNREFUSED')) {
                uploadMsg.textContent = 'Não foi possível conectar ao servidor. Inicie o backend com `npm start` (porta 3000).';
            } else {
                uploadMsg.textContent = 'Erro de conexão: ' + msg;
            }
        }
    });
});
