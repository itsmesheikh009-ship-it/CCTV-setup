const video = document.getElementById("cameraFeed");
const message = document.getElementById("cameraMessage");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");

const statusText = document.getElementById("statusText");

let cameraStream = null;


/* =========================
   CLOCK
========================= */

function updateClock() {

    const now = new Date();

    const time = now.toLocaleTimeString();

    document.getElementById("clock").textContent = time;
}

setInterval(updateClock, 1000);

updateClock();


/* =========================
   TIMESTAMP
========================= */

function updateTimestamp() {

    const now = new Date();

    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    document.getElementById("timestamp").textContent =
        date + " " + time;
}

setInterval(updateTimestamp, 1000);

updateTimestamp();


/* =========================
   START CAMERA
========================= */

startBtn.addEventListener("click", async () => {

    try {

        cameraStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        });

        video.srcObject = cameraStream;

        video.style.display = "block";

        message.style.display = "none";

        statusText.textContent = "Connected";

    } catch (error) {

        console.error(error);

        message.textContent =
            "Camera permission denied or unavailable.";

        statusText.textContent = "Error";
    }

});


/* =========================
   STOP CAMERA
========================= */

stopBtn.addEventListener("click", () => {

    if (cameraStream) {

        cameraStream.getTracks().forEach(track => {
            track.stop();
        });

        cameraStream = null;
    }

    video.srcObject = null;

    video.style.display = "none";

    message.style.display = "block";

    message.textContent = "Camera stopped";

    statusText.textContent = "Disconnected";

});


/* =========================
   FULLSCREEN
========================= */

fullscreenBtn.addEventListener("click", () => {

    const screen = document.querySelector(".camera-screen");

    if (screen.requestFullscreen) {
        screen.requestFullscreen();
    }

});