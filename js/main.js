'use strict';
const API_KEY = "XGMkpQW6W1QmHi6JVBxC74piBVnC6cXF";

// handle header modal
var modal_menu = document.getElementById('modal-menu');
var modal_gallery = document.getElementById('modal-galery');
var menu_bars = document.getElementById("menu-bars");
var menu_times = document.getElementsByClassName("fa-times");
var body = document.getElementById('body');
var favs_gifs = [];
let isModalActive = false;

menu_bars.addEventListener('click', function(){
    modal_menu.style.display = "block";
    isModalActive = true;
    handleScroll();
})

function handleScroll(){
    var body = document.getElementById('body');
    if(isModalActive){
        body.classList.add("modal-open");
    } else {
        body.classList.remove("modal-open"); 
    }
}

function create_no_content_template(src_img, content){
    let wrapper = document.createElement("div");
    let text = document.createElement("p");
    let image = document.createElement("img");
    text.classList.add('title');
    text.innerHTML = content;
    image.setAttribute("src", src_img);
    wrapper.appendChild(image);
    wrapper.appendChild(text);
    return wrapper;
}