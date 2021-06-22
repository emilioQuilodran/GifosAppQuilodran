'use strict';
const API_KEY = "XGMkpQW6W1QmHi6JVBxC74piBVnC6cXF";

// handle header modal
var modal_menu = document.getElementById('modal-menu');
var modal_gallery = document.getElementById('modal-galery');
var menu_bars = document.getElementById("menu-bars");
var menu_times = document.getElementsByClassName("fa-times");
var body = document.getElementById('body');

let isModalActive = false;

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