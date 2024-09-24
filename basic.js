const speedUp = document.querySelector("#speedUp");
const speedDown = document.querySelector("#speedDown");
const volumeUp = document.querySelector("#volumeUp");
const volumeDown = document.querySelector("#volumeDown");

const openBtn = document.querySelector("#videoInput");
const vidInput = document.querySelector("#vidInput");
const vidPlayer = document.querySelector("#main");
const toast = document.querySelector('.toast');

const playBtn = document.querySelector("#playBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const fullScreenBtn = document.querySelector("#fullScreenBtn");
const exitFullScreenBtn = document.querySelector("#exitFullScreenBtn");
let video;
let videoPlaying = false;

// Default playback rate
const defaultPlaybackRate = 1;

const speedUpHandler = function() {
    if (video && video.playbackRate < 2) {
        const newSpeed = video.playbackRate + 0.25;
        video.playbackRate = newSpeed;
        showToast("Speed : " + newSpeed + "x");

    }
}

const speedDownHandler = function() {
    if (video && video.playbackRate > 0.25) {
        const newSpeed = video.playbackRate - 0.25;
        video.playbackRate = newSpeed;
        showToast("Speed : " + newSpeed + "x");
    }
}

const volumeUpHandler = function() {
    const element = vidPlayer.querySelector("video");
    if (element == null) return;
    if (element.volume >= 0.9) return;
    element.volume = element.volume + 0.1;

    showToast("Volume : " + Math.round(element.volume * 100) + "%");
}

const volumeDownHandler = function() {
    if (video) {
        if (video.volume <= 0.1) {
            video.volume = 0;
            showToast("Volume : 0%");
            return;
        }
        if (video.volume > 0.9) video.volume = 0.9;
        else video.volume = video.volume - 0.1;

        showToast("Volume : " + Math.round(video.volume * 100) + "%");
    }
}

function showToast(message) {
    toast.innerHTML = message;
    toast.style.display = "block";
    console.log(video.playbackRate);
    setTimeout(() => {
        toast.style.display = "none";
    }, 2000);

}



const handleInput = function() {
    vidInput.click();
}


const acceptInput = function(obj) {
    if (video) {
        console.log("Removing existing video");
        video.playbackRate = defaultPlaybackRate;
        console.log("speed", video.playbackRate);
        video.volume = 0.5;
        console.log("vol", video.volume);

        video.pause();
        video.remove();
        video = null;
        videoPlaying = false;
    }

    console.log("Loading new video");
    const selectedVideo = obj.target.files[0];
    const link = URL.createObjectURL(selectedVideo);
    vidPlayer.innerHTML = ''; // Clear the player area
    video = document.createElement("video");
    video.src = link;
    video.setAttribute("class", "video");

    video.style.width = "100%"; // Set width and height
    video.style.height = "100%";

    // Set playback rate back to 1
    video.playbackRate = defaultPlaybackRate;

    vidPlayer.appendChild(video);

    video.volume = 0.5; // Set volume to 0.5 after appending to vidPlayer
    console.log("vol", video.volume);

    video.pause(); // Do not auto-play the video

    // Reset file input so that the same video can be selected again
    obj.target.value = "";
    console.log("speed", video.playbackRate);
    console.log("vol", video.volume);
}

const playVid = function() {
    if (video) {
        if (!videoPlaying) {
            video.play();
            videoPlaying = true;
        } else {
            video.pause();
            videoPlaying = false;
        }
    }
}

function toggleMute() {
    if (video.muted) {
        video.muted = false;
        showToast("Unmuted");
    } else {
        video.muted = true;
        showToast("Muted");
    }
}

function playVideo() {
    if (video) {
        if (!videoPlaying) {
            video.play();
            videoPlaying = true;
        } else {
            video.pause();
            videoPlaying = false;
        }
    }
}



document.addEventListener("keydown", function(event) {
    if (!video) return; // Exit if no video is loaded

    if (event.code === "Space") {
        playVideo();
        event.preventDefault(); // Prevent scrolling
    } else if (event.code === "KeyM") {
        toggleMute();
    }
});



vidPlayer.addEventListener("click", playVid);

speedUp.addEventListener("click", speedUpHandler);
speedDown.addEventListener("click", speedDownHandler);
volumeUp.addEventListener("click", volumeUpHandler);
volumeDown.addEventListener("click", volumeDownHandler);

openBtn.addEventListener("click", handleInput);
vidInput.addEventListener("change", acceptInput);