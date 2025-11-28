let button = document.getElementById("button");
let menu = document.querySelector(".esconder");
let laser = document.querySelector(".laser");
let links = document.querySelectorAll(".esconder a");
let slides = document.querySelector(".slides");
<<<<<<< Updated upstream
let imgCards = document.querySelectorAll(".img-cads");
let prev = document.querySelector(".prev-btn");
let next = document.querySelector(".next-btn");
let slides2 = document.querySelector(".slides2");
let cardsProject = document.querySelectorAll(".cards-projects");
let prev2 = document.querySelector(".prev");
let next2 = document.querySelector(".next");

let cont = 0;
let cont2 = 0;
=======
let slidCards = document.querySelectorAll(".img-cads");
let prevBtn = document.querySelector(".prev-btn");
let nextBtn = document.querySelector(".next-btn");

let currentSlide = 0;
const totalSlides = slidCards.length;
>>>>>>> Stashed changes

button.addEventListener("click", () => {
    if(menu.classList.contains("esconder")){
        menu.classList.toggle("mostra"); 
    } else {
        menu.classList.toggle("esconder");
    }
    
});

for(let link of links) {
    link.addEventListener("mouseenter", (e) => {
        let {offsetLeft, offsetWidth} = e.target;
        laser.style.left = offsetLeft + "px";
        laser.style.width = offsetWidth + "px";
    });

};

menu.addEventListener("mouseleave", () => {
    laser.style.width = "0";
});

<<<<<<< Updated upstream
for(let link of links) {
    link.addEventListener("mouseenter", (e) => {
        let {offsetLeft, offsetWidth} = e.target;
        laser.style.left = offsetLeft + "px";
        laser.style.width = offsetWidth + "px";
    });
}

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
    let gap = Number.parseFloat(globalThis.getComputedStyle(slides).gap) || 16;
    
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

function updateSlider2() {
    const screenWidth = window.innerWidth;
    let setVisibleCards = screenWidth <= 768 ? 1 : 4;
    let maxcont = cardsProject.length - setVisibleCards;

    if(cont2 > maxcont) {
        cont2 = maxcont;
    }

    if(cont2 < 0) {
        cont2 = 0;
    }

    let cardWidth = cardsProject[0].offsetWidth;
    let gap = Number.parseFloat(globalThis.getComputedStyle(slides2).gap) || 16;
    
    let move = cont2 * (cardWidth + gap);
    slides2.style.transform = `translateX(-${move}px)`;

}

prev2.addEventListener("click", () => {
    if(cont2 > 0) {
        cont2--;
        updateSlider2();
    }
});

next2.addEventListener("click", () => {
    if(cont2 < cardsProject.length -1) {
        cont2++;
        updateSlider2();
    }
});

window.addEventListener("resize", updateSlider);
window.addEventListener("resize", updateSlider2);

updateSlider();
updateSlider2();
=======
let cardWidth = cards[0].offsetWidth + 40;

function updateCarrossel() {
    slideTrack.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
}

nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarrossel();
});

prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarrossel();
});

setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarrossel();
}, 5000);
>>>>>>> Stashed changes
