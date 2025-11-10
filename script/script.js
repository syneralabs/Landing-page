let button = document.getElementById("button");
let menu = document.getElementById("esconder");

button.addEventListener("click", () => {
    if(menu.classList.contains("esconder")){
        menu.classList.toggle("mostra");
    } else {
        menu.classList.toggle("esconder");
    }
    
});