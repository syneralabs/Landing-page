let btnSignin = document.querySelector("#signin");
let btnSignup = document.querySelector("#signup");

let body = document.querySelector("body");


btnSignin.addEventListener("click", function () {
   body.className = "sign-in-js"; 
});

btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
})

document.getElementById("cadastroForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const formElem = this;
    const fileInput = formElem.querySelector('input[type="file"][name="foto"]');

    try {
        // se houver arquivo, enviar multipart/form-data
        if (fileInput && fileInput.files && fileInput.files.length > 0) {
            const formData = new FormData(formElem);
            const response = await fetch("/clientes/cadastro", {
                method: "POST",
                body: formData
            });
            const result = await response.json();
            console.log(result);

            if (response.ok) {
                alert("Conta criada com sucesso!");
            } else {
                alert("Erro: " + (result.error || JSON.stringify(result)));
            }
        } else {
            // sem arquivo, enviar JSON
            const formData = new FormData(formElem);
            const data = Object.fromEntries(formData);
            const response = await fetch("/clientes/cadastro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            console.log(result);
            if (response.ok) {
                alert("Conta criada com sucesso!");
            } else {
                alert("Erro: " + (result.error || JSON.stringify(result)));
            }
        }
    } catch (err) {
        console.error("Erro ao conectar ao servidor:", err);
        alert('Erro de conexão');
    }
}); // Fim do código de cadastro

document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch("/clientes/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log(result);

        if (response.ok) {
            // armazenar dados do usuário e redirecionar para dashboard
            if (result.user) {
                localStorage.setItem('user', JSON.stringify(result.user));
            }
            alert("Login realizado!");
            window.location.href = '/dashboard.html';
        } else {
            alert("Erro: " + result.error);
        }

    } catch (err) {
        console.error("Erro ao conectar ao servidor:", err);
    }
});