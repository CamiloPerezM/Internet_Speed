let startTime, endTime;
let imageSize = '';
let image = new Image();
let bitSpeed = document.getElementById("bits"),
    kbSpeed = document.getElementById("kbs"),
    mbSpeed = document.getElementById("mbs"),
    info = document.getElementById("info");
let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMbSpeed = 0;
let numTest = 5;
let testComplete = 0;

let imageApi = "https://source.unsplash.com/random?topic=nature";

image.onload = async function(){
    endTime = new Date().getTime();

    await fetch(imageApi).then((response) =>{
        imageSize = response.headers.get("content-length")
        calculateSpeed();
    });
};

function calculateSpeed(){
    let timeDuration = (endTime - startTime) / 1000;
    let loadedBits = imageSize * 8;
    let speedInBits = loadedBits / timeDuration;
    let speedInKbs = speedInBits / 1024;
    let speedInMbs = speedInKbs / 1024;

    totalBitSpeed += speedInBits;
    totalKbSpeed += speedInKbs;
    totalMbSpeed += speedInMbs;

    testComplete ++;

    if(testComplete == numTest){
        let averageSpeedInBps = (totalBitSpeed / numTest).toFixed(2);
        let averageSpeedInKbs = (totalKbSpeed / numTest).toFixed(2);
        let averageSpeedInMbps = (totalMbSpeed / numTest).toFixed(2);

        bitSpeed.innerHTML += `${averageSpeedInBps}`;
        kbSpeed.innerHTML += `${averageSpeedInKbs}`;
        mbSpeed.innerHTML += `${averageSpeedInMbps}`;
        info.innerHTML = "Test Completed!";
    } else {
        startTime = new Date().getTime();
        image.src = imageApi;
    }
}

const init = async () => {
    info.innerHTML = "Testing..."
    startTime = new Date().getTime();
    image.src = imageApi;
}

window.onload = () => {
    for(let i = 0; i < numTest; i++){
        init();
    }
}
