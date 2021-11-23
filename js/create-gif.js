const upload_endpoint = `https://upload.giphy.com/v1/gifs?api_key=${API_KEY}`
var mainWrapper = document.getElementById('create-gifo-wrapper');
var step1Btn = document.getElementById('step1');
var step2Btn = document.getElementById('step2');
var step3Btn = document.getElementById('step3');
var timekeeper = document.getElementById('timekeeper').getElementsByTagName('p')[0];
var startBtnRecord = document.getElementById('startRecord');
var recordBtn = document.getElementById('record');
var endBtnRecord = document.getElementById('endRecord');
var uploadBtnRecord = document.getElementById('uploadRecord');
const gifo = document.getElementById('video');
let stream = null;
var recorder;
var blob;
var contMinutos1 = 0;
var contMinutos2 = 0;
var contSegundos1 = 0;
var contSegundos2 = 0;
// to manipulate the stages to create and upload the gifo
// we can help us sticking this css clases into the main: started | recording | end-record | upload

class Gifo{
    constructor(id, name, user){
        this.favorite = false;
        this.id = id;
        this.name = name;
        this.source_image = "https://media.giphy.com/media/"+id+"/giphy.gif";
        this.user = user;
    }

    getUrl(){
        return this.url;
    }
    getName(){
        return this.name;
    }
    getUser(){
        return this.user;
    }
}

startBtnRecord.addEventListener('click', function(){
    console.log('ready to start');
    _getMedia();

})

recordBtn.addEventListener('click', function(){
    console.log('recording');
    mainWrapper.classList.remove('recording');
    mainWrapper.classList.add('end-record');
    recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function() {
        console.log('started')
        },
    });
    recorder.startRecording();
    _handleTimer();
})

endBtnRecord.addEventListener('click', function(){
    console.log('ending record');
    recorder.stopRecording();
    blob = recorder.getBlob();
    _stopTimer();
    mainWrapper.classList.remove('end-record');
    mainWrapper.classList.add('upload');
    timekeeper.innerText = "Repetir captura";
})

uploadBtnRecord.addEventListener('click', function(){
    console.log("uploading gifo");
    mainWrapper.classList.remove('upload');
    mainWrapper.classList.add('uploading');
    step2Btn.classList.remove("active");
    step3Btn.classList.add("active");
    upload();
})

function _handleScreenInfo(){
    let title = document.getElementById('screen')
                .getElementsByClassName('title');
    let text = document.getElementById('screen')
                .getElementsByTagName('p');
    mainWrapper.classList.add("started");
    step1Btn.classList.add("active");
    title[0].innerText = "Nos das acceso a tu camara?"
    text[0].innerHTML = "El acceso a tu camara será válido sólo <br>por el tiempo en el que estés creando el GIFO."
}
function _handleScreenInfoError(err){
    let title = document.getElementById('screen')
                .getElementsByClassName('title');
    let text = document.getElementById('screen')
                .getElementsByTagName('p');
    title[0].innerText = "Parece que no nos diste permiso a la camara?"
    text[0].innerHTML = "Para grabar debes darle a aceptar <br> El acceso a tu camara será válido sólo <br>por el tiempo en el que estés creando el GIFO."
    mainWrapper.classList.remove('started');
}
async function _getMedia(){
    _handleScreenInfo();

    var constraints = {
        audio: false, 
        video: {
            height: { 
                max: 480 
            }
        }
    };
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(mediaStream) {
        step1Btn.classList.remove('active')
        step2Btn.classList.add('active')
        mainWrapper.classList.remove('started');
        mainWrapper.classList.add('recording');
        var video = document.querySelector('video');
        video.srcObject = mediaStream;
        video.play();
        stream = mediaStream;
    })
    .catch(function(err) { 
        console.log(err.name + ": " + err.message); 
        _handleScreenInfoError();
    });
}
function _handleTimer(){
    console.log('timer initialized');
    timer = setInterval(function () {
        contSegundos2++;
        if (contSegundos2 == 10) {
            contSegundos2 = 0;
            contSegundos1++;

            if (contSegundos1 == 6) {
                contSegundos1 = 0;
                contMinutos2++;

                if (contMinutos2 == 10) {
                    contMinutos2 = 0;
                    contMinutos1++;
                }
            }
        }

        let resultado = "00:"+ contMinutos1 + contMinutos2 + ":" + contSegundos1 + contSegundos2
        timekeeper.innerText = resultado;
    }, 1000);
}
function _stopTimer(){
    clearInterval(timer);
    contMinutos1 = 0;
    contMinutos2 = 0;
    contSegundos1 = 0;
    contSegundos2 = 0;
}
function upload(){
    let form = new FormData();
    form.append('file', blob, 'myGif.gif');
    console.log(form.get('file'))
    fetch(
        upload_endpoint,
        {
            method: "POST",
            body: form,
        }
    )
    .then(response => {

        return response.json()
    })
    .then(response => {
        let list = new Array();
        let gifo = new Gifo(response.data.id, "my Gifs", "my User");
        console.log("gifo", gifo);
        console.log("list", list);
        //list = JSON.parse(localStorage.getItem('myGifsLista'))
        list.push(gifo)
        localStorage.setItem('myGifsLista', JSON.stringify(list))
        console.log("response successful upload");
        document.getElementById('img-upload').src = "./images/icons/check.svg";
        document.getElementById('text-upload').innerText = "GIFO subido con éxito";
    })
    .catch(console.error);
}