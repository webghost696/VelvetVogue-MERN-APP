let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let pyImg = document.querySelector("#py");
let wbImg = document.querySelector("#wb");

menuIcon.onclick = () => {
    menuIcon.classList.toggle("fa-xmark");
    navbar.classList.toggle("active");
}

pyImg.onclick = () => {
    window.location.href = "https://github.com/webghost696/mini-projects-for-python"
}

wbImg.onclick = () => {
    window.location.href = "https://github.com/webghost696/Front-End-Projects";
}

let sections = document.querySelectorAll("section");
let navlinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if(top >= offset && top < offset + height){
            navlinks.forEach.apply(links => {
                links.classList.remove("active");
                document.querySelector("header nav a[href*=" + id + "]").classList.add("active");
            });
        };
    });

    let header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 100);

    menuIcon.classList.remove("fa-xmark");
    navbar.classList.remove("active");
};

ScrollReveal().reveal(".home-content, .heading", {
    distance: "80px",
    origin: "top",
    duration: 2000,
    delay: 200,
    reset: true 
});

ScrollReveal().reveal(".home-img, .portfolio-box, .contact form", {
    distance: "80px",
    origin: "bottom",
    duration: 2000,
    delay: 200,
    reset: true 
});

ScrollReveal().reveal(".home-contact h1, .about-img", {
    distance: "80px",
    origin: "left",
    duration: 2000,
    delay: 200,
    reset: true
});

ScrollReveal().reveal(".home-contact p, .about-content", {
    distance: "80px",
    origin: "right",
    duration: 2000,
    delay: 200,
    reset: true
});


const typed = new Typed(".multiple-text", {
    strings: ["Frontend Developer", "Web Designer","Programmer"],
    typeSpeed: 70,
    backSpeed: 70,
    backDelay: 1000,
    loop: true,
});