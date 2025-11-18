let button = document.getElementById("button");
let menu = document.querySelector(".esconder");
let laser = document.querySelector(".laser");
let links = document.querySelectorAll(".esconder a");

button.addEventListener("click", () => {
    if(menu.classList.contains("esconder")){
        menu.classList.toggle("mostra"); 
    } else {
        menu.classList.toggle("esconder");
    }
    
});

links.forEach(link => {
    link.addEventListener("mouseenter", (e) => {
        let {offsetLeft, offsetWidth} = e.target;
        laser.style.left = offsetLeft + "px";
        laser.style.width = offsetWidth + "px";
    });

});

menu.addEventListener("mouseleave", () => {
    laser.style.width = "0";
});

links.forEach(link => {
    link.addEventListener("mouseenter", (e) => {
        let {offsetLeft, offsetWidth} = e.target;
        laser.style.left = offsetLeft + "px";
        laser.style.width = offsetWidth + "px";
    });
});

menu.addEventListener("mouseleave", () => {
    laser.style.width = "0";
});