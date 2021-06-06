const API_KEY = "XGMkpQW6W1QmHi6JVBxC74piBVnC6cXF";
var url_trending = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=3`;

var gifs_array = new Array();
let template_cards = new Array();
let trend_container = document.getElementById("gifs-wrapper");
let modal_gallery_template = document.getElementById("modal-galery");
var btn_show_modal;
var btn_like_collection;
var btn_download_collection;
var has_liked;
var card;

// Trendings feature
async function my_fetch(){
    try {
        await fetch(url_trending)
        .then( response => response.json() )
        .then( response => {
            for(const item of response.data){
                // fix username: when content is blank
                card = new GifCard(item.username, item.title, item.images.original.url);
                gifs_array.push(card);
                let template = create_card(card);
                trend_container.appendChild(template);
                btn_like_collection = document.getElementsByClassName('like');
                btn_show_modal = document.getElementsByClassName('max');
                btn_download_collection = document.getElementsByClassName('download');
            }

            for(const item of btn_download_collection){
                item.addEventListener("click", function() {
                    let item_info = item.parentNode.parentNode.parentNode;
                    console.log(item_info);
                });
            }
            for (const item of btn_like_collection) {
                // TODO: save info in favs
                let item_info = item.parentNode.parentNode.parentNode;
                item.addEventListener("click", function(){
                    console.log(item_info);
                    has_liked = !has_liked;
                    has_liked ? item.classList.add("active") : item.classList.remove("active");
                })
            };
            for (const item of btn_show_modal) {
                item.addEventListener("click", function(){
                    let item_info = item.parentNode.parentNode.parentNode;
                    let img_src = item_info.childNodes[1].src;
                    let info_card = {
                        user: item_info.childNodes[0].childNodes[1].firstChild.innerHTML,
                        title: item_info.childNodes[0].childNodes[1].lastChild.innerHTML,
                        image: img_src 
                    }
                    console.log(info_card);
                    show_modal_gallery(info_card);
                })
            }
        });
    } catch (error) {
        throw new Error(`HTTP error! status:`);
    }
}

my_fetch()
.catch(e => {
  console.log('There has been a problem with your fetch operation: ' + e.message);
});

class GifCard {
    constructor(user, title, source_image){
        this.user = user;
        this.title = title;
        this.source_image = source_image;
    }
}

function create_card(item){
    let card = document.createElement('div');
    let gif = document.createElement('img');
    let overlay = create_card_info(item);
    card.classList.add('card');
    card.appendChild(overlay);
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
    return overlay;
}