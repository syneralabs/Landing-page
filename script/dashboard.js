async function carregarUsuario() {
    const response = await fetch("/dashboard.html", {
        credentials: "include"
    });

    if (!response.ok) {
        window.location.href = "/login.html";
        return;
    }

    const user = await response.json();

    document.querySelector(".name").textContent = user.nome;
    document.querySelector(".email").textContent = user.email;
    document.querySelector("img").src = user.foto;
}

carregarUsuario();