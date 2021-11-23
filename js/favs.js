var favs_container_results = document.getElementById('results');
var favs_no_content = document.getElementById('no-content');
var data_favs = localStorage.getItem('favoritos');
console.log(data_favs);
//data_favs = JSON.parse(data_favs);
console.log("data_Favs from localstorage",data_favs);
if(data_favs == null || data_favs.length <= 0){
    favs_no_content.appendChild(create_no_content_template('./images/icon-fav-sin-contenido.svg', "¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!"));
} else {
    console.log("hay items pa mostrar hijo");
    for(const item of data_favs){
        let template = create_card(item, "-md");
        favs_container_results.appendChild(template);
    }
}

console.log("data from lS", data_favs);