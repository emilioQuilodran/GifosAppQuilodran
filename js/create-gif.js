const upload_endpoint = `https://api.giphy.com/v1/gifs?api_key=${API_KEY}`

var startRecord = document.getElementById('startRecord');
var step1Btn = document.getElementById('step1');
var step2Btn = document.getElementById('step2');
var step3Btn = document.getElementById('step3');



let items = [
    startRecord, step1Btn, step2Btn, step3Btn
]
console.log('items', items);

async function getMedia(){
    let stream = null;

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
        var video = document.querySelector('video');
        video.srcObject = mediaStream;
        video.play();
        stream = mediaStream;
    })
    .catch(function(err) { console.log(err.name + ": " + err.message); });
}

startRecord.addEventListener('click', function(){
    console.log('starting record');

})