'use strict';
console.log("hello word :)");
var modal_menu = document.getElementById('modal-menu');
var menu_bars = document.getElementById("menu-bars");
var menu_times = document.getElementById("menu-times");
var linkStyle = document.getElementById('theme-style');
var theme_btn = document.getElementById('theme-btn');
const DARK_PATH = "./styles/dark.css";
let isModalActive = false;
let isLight = true;

let theme = localStorage.getItem('modo-nocturno');

menu_bars.addEventListener('click', function(){
    modal_menu.style.display = "block";
    isModalActive = true;
    handleScroll();
})
menu_times.addEventListener('click', function(){
    modal_menu.style.display = "none";
    isModalActive = false;
    handleScroll();
})

theme_btn.addEventListener('click', modeSwitch);

function handleScroll(){
    var body = document.getElementById('body');
    if(isModalActive){
        body.classList.add("modal-open");
    } else {
        body.classList.remove("modal-open"); 
    }
}
function modeSwitch(){
    isLight = !isLight;
    if(isLight){
        linkStyle.href = "";
        theme_btn.innerHTML = "Modo Nocturno";
        console.log(" theme dark: ",isLight);
    } else {
        console.log(" theme dark: ",isLight);
        linkStyle.href = DARK_PATH;
        theme_btn.innerHTML = "Modo Diurno";
    }
    localStorage.setItem('modo-nocturno', isLight);
}