'use strict';

console.log("hello from cards features");

// like - unlike | download gif

var btn_like_collection = document.getElementsByClassName('like');
var has_liked;

for (const item of btn_like_collection) {
    // TODO: save info in favs
    let item_info = item.parentNode.parentNode;
    item.addEventListener("click", function(){
        has_liked = !has_liked;
        console.log(item_info);
        has_liked ? item.classList.add("active") : item.classList.remove("active");
    })
};