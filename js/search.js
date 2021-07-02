const search_endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=12`;
const autocomplete_endpoint = `https://api.giphy.com/v1/gifs/search/tags?api_key=${API_KEY}`;
var gifs_search_response = new Array();
var input = document.getElementById("search");
var search_component = document.getElementsByClassName('search-component')[0]; 
var categories = document.getElementsByClassName('categories')[0];
var icon_search = search_component.children[1].children[0];
var results_container = document.getElementById('results');
var search_container = document.getElementById('search-tmp');
let btn = document.createElement('a');
let suggestions_list = document.getElementById('suggestions');
btn_text = document.createElement('span');
btn_text.innerHTML = "ver más";
btn.appendChild(btn_text);
btn.classList.add('btn');
btn.style.display = "none";
search_container.append(btn);

input.addEventListener('keyup', function(e){
    e.preventDefault();
    let value = input.value;
    value = value.trim();
    if(value != ""){
        icon_search.classList.remove('fa-search');
        icon_search.classList.add('fa-times');
        search_component.classList.add('active');
        suggestions_list.textContent = "";
        autocomplete(value);
    }
    if(e.keyCode === 13 && value != undefined){
        icon_search.classList.remove('fa-times');
        icon_search.classList.add('fa-search');
        search_component.classList.remove('active');
        window.onload = search(value);
    }
});

input.addEventListener('click', function(e){
    e.preventDefault();
})

input.addEventListener('focusout', function(e){
    e.preventDefault();
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
        console.log(title.innerHTML)
        btn.addEventListener("click", function(){
            viewMore(title.innerHTML);
        })
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

function autocomplete(char){
    let url = autocomplete_endpoint + "&q=" + char;
    fetch(url)
    .then(response => response.json())
    .then(response => {
        for(const item of response.data){
            renderItem(item);
        }
        let items = document.getElementById('suggestions').getElementsByClassName('item');
        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            element.addEventListener('click', () => {
                input.value = element.getElementsByTagName('p')[0].innerHTML;
                window.onload = search(input.value);
                clearAutocompleteComponent();
            })
        }
    })
    .catch(e => {
        console.log('failed to get autocomplete response' + e);
    });
}

function renderItem(item){
    let li = document.createElement('li');
    let icon = document.createElement('i');
    let text = document.createElement('p');

    li.style.cursor = "pointer";
    li.classList.add('item');
    icon.classList.add('fa');
    icon.classList.add('fa-search');
    text.innerHTML = "";
    text.innerHTML = item.name;
    li.append(icon);
    li.append(text);
    suggestions_list.append(li);
}
function clearAutocompleteComponent(){
    search_component.classList.remove('active');
    icon_search.classList.remove('fa-times');
    icon_search.classList.add('fa-search');
    input.value = "";
}

function viewMore(text){
    let offset_query = gifs_search_response.length;
    let url = search_endpoint + "&q=" + text + "&offset=" + offset_query;
    console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(response => {
        console.log(response.data);
        for(const item of response.data){
            card = new GifCard(item.id, item.username, item.title, item.images.original.url);
            gifs_search_response.push(card);
            let template = create_card(card, "-md");
            results_container.appendChild(template);
        }
    })
    .catch(e => {
        console.log('failed to execute view more items' + e);
    });

}