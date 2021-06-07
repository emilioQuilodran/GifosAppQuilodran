'use strict';

// handle header modal & theme features
var modal_menu = document.getElementById('modal-menu');
var modal_gallery = document.getElementById('modal-galery');
var menu_bars = document.getElementById("menu-bars");
var menu_times = document.getElementsByClassName("fa-times");
var theme_btn = document.getElementsByClassName('theme-btn');
var body = document.getElementById('body');
var btn_show_modal = document.getElementsByClassName('max');

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

// close modals
for (const item of menu_times) {
    item.addEventListener('click', function(){
        modal_menu.style.display = "none";
        modal_gallery.style.display = "none";
        isModalActive = false;
        handleScroll();
    })   
}
for (const item of btn_show_modal) {
    item.addEventListener("click", show_modal_gallery);
}
function show_modal_gallery(data){
    isModalActive = true;
    let gallery = document.getElementById('modal-galery');
    gallery.style.display = 'block';
    gallery.getElementsByTagName('img')[0].src = data.image;
    console.log();
    gallery.getElementsByClassName("description")[0].firstElementChild.innerHTML = data.user;
    gallery.getElementsByClassName("description")[0].lastElementChild.innerHTML = data.title;
    handleScroll();
}

function handleScroll(){
    var body = document.getElementById('body');
    if(isModalActive){
        body.classList.add("modal-open");
    } else {
        body.classList.remove("modal-open"); 
    }
}
function handleTheme(theme){
    if(!theme){
        body.classList.add('dark-mode');
        Array.from(theme_btn).forEach((el)=>{
            body.classList.add('dark-mode');
            el.innerHTML = "Modo Diurno";
        });
    } else {
        Array.from(theme_btn).forEach((el)=>{
            if(body.classList.contains('dark-mode')){
                body.classList.remove('dark-mode');
            }
            el.innerHTML = "Modo Nocturno";
        });
    }
}

Array.from(theme_btn).forEach((element)=>{
    element.addEventListener('click', function(){
        isLight = !isLight;
        handleTheme(isLight)
        localStorage.setItem('modo-normal', isLight);
    });
})