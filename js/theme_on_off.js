var theme_btn = document.getElementsByClassName('theme-btn');
let isLight;

let theme = localStorage.getItem('modo-normal');
theme = (theme === "true")
handleTheme(theme);

function handleTheme(theme){
    if(!theme){
        body.classList.add('dark-mode');
        Array.from(theme_btn).forEach((el)=>{
            body.classList.add('dark-mode');
            el.innerHTML = "Modo Diurno";
        });
    } else {
        Array.from(theme_btn).forEach((el)=>{
            if(body.classList.contains('dark-mode')){
                body.classList.remove('dark-mode');
            }
            el.innerHTML = "Modo Nocturno";
        });
    }
}

Array.from(theme_btn).forEach((element)=>{
    element.addEventListener('click', function(){
        isLight = !isLight;
        handleTheme(isLight)
        localStorage.setItem('modo-normal', isLight);
    });
})