const API_KEY = "XGMkpQW6W1QmHi6JVBxC74piBVnC6cXF";
var url_trending = `http://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`;

var gifs_array = new Array();
let template_cards = new Array();
let trend_container = document.getElementById("gifs-wrapper");

// Trendings feature
async function my_fetch(){
    try {
        await fetch(url_trending)
        .then( response => response.json() )
        .then( response => {
            for(const item of response.data){
                // fix username: when content is blank
                let card = new GifCard(item.username, item.title, item.images.original.url);
                gifs_array.push(card);
                let template = create_card(card);
                trend_container.appendChild(template);
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