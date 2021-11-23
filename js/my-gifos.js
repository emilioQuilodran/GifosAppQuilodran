var my_gifos_container = document.getElementById('results');
var my_gifos_no_content = document.getElementById('no-content');
var data_my_gifos = localStorage.getItem('myGifsLista');
data_my_gifos = JSON.parse(data_my_gifos);

if(data_my_gifos == null || data_my_gifos <= 0){
    my_gifos_no_content.appendChild(create_no_content_template('./images/icon-mis-gifos-sin-contenido.svg', "¡Anímate a crear tu primer GIFO!"));
} else {
    console.log("hay items pa mostrar hijo");
    for (const item of data_my_gifos) {
        console.log(item);
        let template = create_card(item, "-md");
        my_gifos_container.appendChild(template);
    }
}