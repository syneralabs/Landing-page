let button = document.getElementById("button");
let menu = document.querySelector(".esconder");
let laser = document.querySelector(".laser");
let links = document.querySelectorAll(".esconder a");
let slids = document.querySelector(".slides")
let cardsImagens = document.querySelectorAll(".img-cads")
let prev = document.querySelector(".prev-btn")
let next = document.querySelector(".next-btn")

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

let index = 0;
const cardWidth = cardsImagens[0].offsetWidth + 40;

function updateSlid() {
    slids.style.transform 
}