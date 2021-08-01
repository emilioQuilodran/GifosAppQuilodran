function create_modal(item){
    let gallery = document.getElementById('modal-galery');
    gallery.style.display = 'block';
    let body = document.createElement("div");
    body.classList.add("body");
    let close_btn = document.createElement("i");
    close_btn.classList.add("fa");
    close_btn.classList.add("fa-times");
    close_btn.classList.add("fa-lg");
    let arrowRight = create_arrow("fa-angle-left");
    let arrowLeft = create_arrow("fa-angle-right");
    let img_gif = document.createElement("img");
    img_gif.setAttribute("src",  item.source_image);
    let actions_content = create_actions_modals(item);
    
    body.appendChild(close_btn);
    body.appendChild(arrowRight);
    body.appendChild(img_gif);
    body.appendChild(arrowLeft);
    body.appendChild(actions_content);
    gallery.children[0].appendChild(body);

    // interactions
    close_btn.addEventListener("click", function(){
        console.log("cerrar modal");
        gallery.style.display = 'none';
        gallery.children[0].innerHTML = "";
        isModalActive = false;
        handleScroll();
    });

}

function create_arrow(side){
    let arrow = document.createElement("div");
    let icon = document.createElement("i");

    arrow.classList.add("arrow");
    icon.classList.add("fa");
    icon.classList.add(side);
    arrow.appendChild(icon);
    return arrow;
}

function create_actions_modals(item){
    let actions = document.createElement("div");
    actions.classList.add("actions")
    let desc_content = document.createElement("div");
    desc_content.classList.add("description")
    let title = document.createElement("p");
    let text = document.createElement("p");
    item.user ? title.innerHTML = item.user :title.innerHTML = "user"; 
    text.classList.add("title");
    text.innerHTML = item.title;
    let icons_content = document.createElement("div");
    let fav_icon = document.createElement("span");
    fav_icon.classList.add("icon");
    fav_icon.classList.add("like");
    let download_icon = document.createElement("span");
    download_icon.classList.add("icon");
    download_icon.classList.add("download");

    icons_content.appendChild(fav_icon);
    icons_content.appendChild(download_icon);
    desc_content.appendChild(title);
    desc_content.appendChild(text);
    actions.appendChild(desc_content);
    actions.appendChild(icons_content);
    if(item.isFavorite){
        fav_icon.classList.add("active");
    } else {
        fav_icon.classList.remove("active");
    }

    fav_icon.addEventListener("click", function(){
        item.isFavorite = !item.isFavorite;
        if(item.isFavorite){
            fav_icon.classList.add("active");
            if(!favs_gifs.includes(item)){
                favs_gifs.push(item);
                localStorage.setItem("favoritos", JSON.stringify(favs_gifs))
            }
            
        } else {
            if(favs_gifs.includes(item)){
                favs_gifs = arrayRemove(favs_gifs, item)
                localStorage.setItem("favoritos", JSON.stringify(favs_gifs))
            }
            fav_icon.classList.remove("active");
        }
        updateCard(item);   
    });

    download_icon.addEventListener("click", function(){
        console.log("downloading gif");
        var x=new XMLHttpRequest();
        x.open("GET", item.source_image, true);
        x.responseType = 'blob';
        x.onload=function(e){download(x.response, "descarga.gif", "image/gif" ); }
        x.send();
    });
    return actions;
}

function arrayRemove(arr, value){
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

function renderCards(arr, size,dist){
    dist.innerHTML = "";
    arr.forEach(element => {
        element = create_card(element, size);
        dist.appendChild(element);
    });
}

function updateCard(gif){
    let gifs_search_response = new Array();
    let results_container = document.getElementById('results');
    if(gifs_search_response){
        let obj = gifs_search_response.find(el => el.id == gif.id);
        if(obj){
            obj.isFavorite = gif.isFavorite;
        }
        renderCards(gifs_search_response, "-md" ,results_container)
    }
    renderCards(gifs_array, "-lg" ,trend_container)
}