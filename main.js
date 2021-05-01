'use strict';
console.log("hello word :)");
var modal_menu = document.getElementById('modal-menu');
var menu_bars = document.getElementById("menu-bars");
var menu_times = document.getElementById("menu-times");
var isModalActive = false;

menu_bars.addEventListener('click', function(){
    console.log("in");
    modal_menu.style.display = "block";
    isModalActive = true;
    handleScroll();
})

menu_times.addEventListener('click', function(){
    console.log("out");
    modal_menu.style.display = "none";
    isModalActive = false;
    handleScroll();
})

function handleScroll(){
    var body = document.getElementById('body');
    console.log(body);
    if(isModalActive){
        body.classList.add("modal-open");
    } else {
        body.classList.remove("modal-open"); 
    }
}