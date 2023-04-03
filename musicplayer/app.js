const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const progressBar = document.querySelector("#progress-bar");
const current = document.querySelector(".current-time");
const duration = document.querySelector(".duration");
const volume = document.querySelector("#voice");
const volumeBar = document.querySelector("#voice-bar");

const player = new MusicPlayer(musicList);

window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
});

function displayMusic(music) {
    title.innerText = music.title;
    singer.innerText = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
}

play.addEventListener("click", () => {
   if(container.classList.contains("playing")){
     audio.pause();
     container.classList.remove("playing");
     play.classList = "fa-solid fa-play"
   }else {
    audio.play();
    container.classList.add("playing");
    play.classList = "fa-solid fa-pause";
   }
})

prev.addEventListener("click", () => {
  prevSong();
})
next.addEventListener("click", () => {
  nextSong();
})

function prevSong() {
    player.previous();
    let music = player.getMusic();
    displayMusic(music);
    audio.play();
    container.classList.remove("playing");
    play.classList = "fa-solid fa-play"

}

function nextSong() {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    audio.play();
    container.classList.add("playing");
    play.classList = "fa-solid fa-pause";

}

audio.addEventListener("loadedmetadata", () => {
  duration.textContent = calculateTime(audio.duration);
  progressBar.max = Math.floor(audio.duration);
})

const calculateTime = (totalSecond) => {
  const minute = Math.floor(totalSecond / 60);
  const second = Math.floor(totalSecond % 60);
  const fixedSecond = second < 10 ? `0${second}`: `${second}`;
  const  result = `${minute}:${fixedSecond}`;
  return result;
}

audio.addEventListener("timeupdate", () => {
  progressBar.value = Math.floor(audio.currentTime);
  current.textContent = calculateTime(progressBar.value);
})

progressBar.addEventListener("input", () => {
  current.textContent = calculateTime(progressBar.value);
  audio.currentTime = progressBar.value
})

let voiceState = "opened"
volume.addEventListener("click", () => {
  if(voiceState === "opened"){
      audio.muted = true;
  voiceState = "closed"
    volume.classList = "fa-solid fa-volume-xmark";
    volumeBar.value = "0";
  }else {
    audio.muted = false;
    voiceState = "opened";
   volume.classList = "fa-solid fa-volume-high";
     volumeBar.value = "100";
  }
    
})
volumeBar.addEventListener("input", (e) => {
 const barValue = e.target.value;
 audio.volume = barValue  / 100 ;
 if(audio.volume == 0){
  audio.muted = true;
  voiceState = "closed"
  volume.classList = "fa-solid fa-volume-xmark";
 }else{
  audio.muted = false;
  voiceState = "opened";
  volume.classList = "fa-solid fa-volume-high";
 }

}) 