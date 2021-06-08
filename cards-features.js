const API_KEY = "XGMkpQW6W1QmHi6JVBxC74piBVnC6cXF";
var url_trending = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=3`;

var gifs_array = new Array();
let template_cards = new Array();
let trend_container = document.getElementById("gifs-wrapper");
let modal_gallery_template = document.getElementById("modal-galery");
var btn_show_modal = document.getElementsByClassName('max');
var has_liked;
var card;

// Trendings feature
function my_fetch(url_trending){
    fetch(url_trending)
    .then( response => response.json() )
    .then( response => {
        for(const item of response.data){
            // fix username: when content is blank
            card = new GifCard(item.id, item.username, item.title, item.images.original.url);
            gifs_array.push(card);
            let template = create_card(card);
            trend_container.appendChild(template);
        }
    })
    .catch(e => {
        console.log('There has been a problem with your fetch operation: ' + e.message);
      });
}
my_fetch(url_trending);

class GifCard {
    constructor(id, user, title, source_image){
        this.id = id;
        this.user = user;
        this.title = title;
        this.source_image = source_image;
        this.isFavorite = false;
    }
    getUser(){
        return this.user;
    }
    setUser(user){
        this.user = user;
    }
    getTitle(){
        return this.title;
    }
    setTitle(title){
        this.title = title;
    }
    getImage(){
        return this.source_image;
    }
    setImage(src){
        this.source_image = src;
    }
    getFavorite(){
        return this.isFavorite;
    }
    setFavorite(val){
        this.isFavorite = val;
    }
}

function create_card(item){
    let card = document.createElement('div');
    let id = document.createElement('span');
    let gif = document.createElement('img');
    let overlay = create_card_info(item);
    card.classList.add('card');
    card.appendChild(overlay);
    id.style.display = 'none';
    id.innerHTML = item.id;
    card.appendChild(id);
    gif.setAttribute("src", item.source_image);
    gif.setAttribute("alt", item.title);
    card.appendChild(gif);
    return card;
}

function create_card_info(item){
    let overlay = document.createElement('div');
    overlay.classList.add('overlay');
    let actions = document.createElement('div');
    let info = document.createElement('div');
    let user = document.createElement('p');
    let title = document.createElement('h6');
    let like = document.createElement('span');
    let download = document.createElement('span');
    let max = document.createElement('span');
    
    like.classList.add('icon');
    like.classList.add('like');
    if(item.isFavorite){
        like.classList.add('active');
    } else {
        like.classList.remove('active');
    }
    download.classList.add('icon');
    download.classList.add('download');
    max.classList.add('icon');
    max.classList.add('max');
    actions.appendChild(like);
    actions.appendChild(download);
    actions.appendChild(max);
    user.innerHTML = item.user != "" ? item.user : "User";
    title.innerHTML = item.title;
    info.appendChild(user);
    info.appendChild(title);

    overlay.appendChild(actions);
    overlay.appendChild(info);
    
    max.addEventListener("click", function(){
        let id = item.id;
        console.log(id);
        show_modal_gallery(id);
    })
    return overlay;
}