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

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch("http://localhost:3000/clientes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log(result);

        if (response.ok) {
            alert("Conta criada com sucesso!");
        } else {
            alert("Erro: " + result.error);
        }

    } catch (err) {
        console.error("Erro ao conectar ao servidor:", err);
    }
}); // Fim do código de cadastro

document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch("http://localhost:3000/clientes/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log(result);

        if (response.ok) {
            alert("Login realizado!");
            // redireciona se quiser
            // window.location.href = "/dashboard.html";
        } else {
            alert("Erro: " + result.error);
        }

    } catch (err) {
        console.error("Erro ao conectar ao servidor:", err);
    }
});