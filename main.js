'use strict';

// handle header modal & theme features
var modal_menu = document.getElementById('modal-menu');
var modal_gallery = document.getElementById('modal-galery');
var menu_bars = document.getElementById("menu-bars");
var menu_times = document.getElementsByClassName("fa-times");
var theme_btn = document.getElementsByClassName('theme-btn');
var body = document.getElementById('body');
var btn_like_collection = document.getElementById('modal-galery').getElementsByClassName('like');
var btn_download_collection = document.getElementById('modal-galery').getElementsByClassName('download');

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

var currentObject;
function show_modal_gallery(id){
    isModalActive = true;
    let gallery = document.getElementById('modal-galery');
    gallery.style.display = 'block';
    Array.from(gifs_array).forEach((el)=>{
        if(el.id === id) {
            currentObject = el;
            gallery.getElementsByTagName('img')[0].src = el.source_image;
            gallery.getElementsByClassName("description")[0].firstElementChild.innerHTML = el.user != "" ? el.user : "User";
            gallery.getElementsByClassName("description")[0].lastElementChild.innerHTML = el.title;
            handleScroll();
        };
    });
    console.log(currentObject);
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


for (const item of btn_like_collection) {
    // TODO: save info in favs
    let item_info = item.parentNode.parentNode.parentNode;
    item.addEventListener("click", function(){
        console.log("like feaure");
        has_liked = !has_liked;
        has_liked ? item.classList.add("active") : item.classList.remove("active");
    })
};

for(const item of btn_download_collection){
    item.addEventListener("click", function() {
        let item_info = item.parentNode.parentNode.parentNode;
        console.log("download gif" , item_info);
    });
}