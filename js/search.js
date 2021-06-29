const search_endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=12`;
var gifs_search_response = new Array();

var input = document.getElementById("search");
var search_component = document.getElementsByClassName('search-component')[0]; 
var categories = document.getElementsByClassName('categories')[0];
var icon_search = search_component.children[1].children[0];
var results_container = document.getElementById('results');
var search_container = document.getElementById('search-tmp');
let btn = document.createElement('a');
btn_text = document.createElement('span');
btn_text.innerHTML = "ver más";
btn.appendChild(btn_text);
btn.classList.add('btn');
btn.style.display = "none";
search_container.append(btn);

input.addEventListener('keyup', function(e){
    e.preventDefault();
    icon_search.classList.remove('fa-search');
    icon_search.classList.add('fa-times');
    search_component.classList.add('active');
    let value = input.value;
    value = value.trim();
    if(e.keyCode === 13 && value != undefined){
        icon_search.classList.remove('fa-times');
        icon_search.classList.add('fa-search');
        search_component.classList.remove('active');
        window.onliad = search(value);
    }
});

input.addEventListener('click', function(e){
    e.preventDefault();
})

input.addEventListener('focusout', function(e){
    e.preventDefault();
    search_component.classList.remove('active');
    icon_search.classList.remove('fa-times');
    icon_search.classList.add('fa-search');
})

function search(query){
    let url = search_endpoint + "&q=" + query;
    fetch(url)
    .then(response => response.json())
    .then(response => {
        let title = search_component.nextElementSibling;
        title.innerHTML = query;
        results_container.innerHTML = "";
        btn.style.display = "inline-block";
        categories.remove();

        for(const item of response.data){
            card = new GifCard(item.id, item.username, item.title, item.images.original.url);
            gifs_search_response.push(card);
            let template = create_card(card, "-md");
            results_container.appendChild(template);
        }
    })
    .catch(e => {
        console.log('failed to get search response' + e);
    });
}