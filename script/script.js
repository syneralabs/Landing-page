let button = document.getElementById("button");
let menu = document.querySelector(".esconder");
let laser = document.querySelector(".laser");
let links = document.querySelectorAll(".esconder a");
let slides = document.querySelector(".slides");
let imgCards = document.querySelectorAll(".img-cads");
let prev = document.querySelector(".prev-btn")
let next = document.querySelector(".next-btn")

let cont = 0;

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

function updateSlider() {
    const screenWidth = window.innerWidth;
    let setVisibleCards = screenWidth <= 768 ? 1 : 4;
    let maxcont = imgCards.length - setVisibleCards;

    if(cont > maxcont) {
        cont = maxcont;
    }

    if(cont < 0) {
        cont = 0;
    }

    let cardWidth = imgCards[0].offsetWidth;
    let gap = parseInt(window.getComputedStyle(slides).gap) || 16;
    
    let move = cont * (cardWidth + gap);
    slides.style.transform = `translateX(-${move}px)`;
}

prev.addEventListener("click", () => {
    if(cont > 0) {
        cont--;
        updateSlider(); 
    }
});

next.addEventListener("click", () => {
    if(cont < imgCards.length -1) {
        cont++;
        updateSlider();
    }
});

window.addEventListener("resize", updateSlider);

updateSlider();