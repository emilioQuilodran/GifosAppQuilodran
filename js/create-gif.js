const upload_endpoint = `https://api.giphy.com/v1/gifs?api_key=${API_KEY}`
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

startBtnRecord.addEventListener('click', function(){
    console.log('ready to start');
    _handleScreenInfo();
    _getMedia();

})

recordBtn.addEventListener('click', function(){
    console.log('recording');
    mainWrapper.classList.remove('recording');
    mainWrapper.classList.add('end-record');
    console.log('stream', stream);
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
    console.log('blob'. blob);
    _stopTimer();
    mainWrapper.classList.remove('end-record');
    mainWrapper.classList.add('upload');
    timekeeper.innerText = "Repetir captura";
})

uploadBtnRecord.addEventListener('click', function(){
    console.log("uploading gifo");
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

async function _getMedia(){
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
    .catch(function(err) { console.log(err.name + ": " + err.message); });
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