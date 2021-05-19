'use strict';
console.log("hello word :)");
var modal_menu = document.getElementById('modal-menu');
var menu_bars = document.getElementById("menu-bars");
var menu_times = document.getElementById("menu-times");
var theme_btn = document.getElementById('theme-btn');
var body = document.getElementById('body');
let isModalActive = false;
let isLight;

let theme = localStorage.getItem('modo-normal');
theme = (theme === "true")
handleTheme(theme);

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
        if(body.classList.contains('dark-mode')){
            body.classList.remove('dark-mode');
        }
        theme_btn.innerHTML = "Modo Nocturno";
    } else {
        body.classList.add('dark-mode');
        theme_btn.innerHTML = "Modo Diurno";
    }
    localStorage.setItem('modo-normal', isLight);
}
function handleTheme(theme){
    if(!theme){
        body.classList.add('dark-mode');
        theme_btn.innerHTML = "Modo Diurno";
    }
}