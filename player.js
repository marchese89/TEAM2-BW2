const playPauseButton = document.getElementById("play-pause-button");
const audio = new Audio();
const progressBar = document.getElementById("progress-bar");
const timePassed = document.getElementById("time-passed");
const timeTotal = document.getElementById("time-total");
const likeIcon = document.getElementById("like-icon");
const likeTooltip = document.getElementById("like-tooltip");
const likeTooltip2 = document.getElementById("like-tooltip2");
const shaker = document.querySelector(".shacker");
const clock = document.querySelector("#timePassed");
const shuffle = document.querySelector(".bi-shuffle");
const rewind = document.querySelector(".fa-undo-alt");
const back = document.querySelector(".fa-step-backward");
const volume = document.getElementById("volume-bar");
let isPlaying = false;
let currentTime = 0;

fetch("https://striveschool-api.herokuapp.com/api/deezer/album/75621062")
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new error("errore");
    }
  })
  .then((album) => {
    console.log(album);
    const titolo = document.querySelector("#player .ms-3 h6");
    titolo.innerText = album.tracks.data[0].title;
    const artista = document.querySelector("#player .ms-3 p");
    artista.innerText = album.tracks.data[0].artist.name;
    const immagine = document.querySelector("#player .img1 img");
    immagine.src = album.tracks.data[0].album.cover;
    const clockStart = document.querySelector("#timeStart");
    clockStart.innerText = `0:${album.tracks.data[0].duration - 1}`;
    playPauseButton.addEventListener("click", function () {
      if (!isPlaying) {
        if (currentTime === 0) {
          audio.src = album.tracks.data[0].preview;
        }
        audio.currentTime = currentTime;
        audio.play();
        isPlaying = true;
      } else {
        audio.pause();
        currentTime = audio.currentTime;
        isPlaying = false;
      }
      updatePlayButtonState();
    });
  })
  .catch((err) => {
    console.log(err);
  });

function updatePlayButtonState() {
  if (isPlaying) {
    playPauseButton.classList.remove("bi-play-circle-fill");
    playPauseButton.classList.add("bi-pause-circle-fill");
  } else {
    playPauseButton.classList.remove("bi-pause-circle-fill");
    playPauseButton.classList.add("bi-play-circle-fill");
  }
}

likeIcon.addEventListener("click", function () {
  likeTooltip2.style.display = "none";
  likeTooltip.style.display = "none";
  if (likeIcon.classList.contains("bi-heart")) {
    shaker.classList.remove("shake");
    shaker.classList.add("big");
    likeIcon.classList.remove("bi-heart");
    likeIcon.classList.add("bi-heart-fill");
    likeIcon.classList.add("text-success");
    likeTooltip2.textContent = "Elemento aggiunto ai brani che ti piacciono!";
    likeTooltip2.style.display = "block";
  } else {
    shaker.classList.add("shake");
    shaker.classList.remove("big");
    likeIcon.classList.remove("bi-heart-fill");
    likeIcon.classList.remove("text-success");
    likeIcon.classList.add("bi-heart");
    likeTooltip2.textContent = "Elemento rimosso dai brani che ti piacciono!";
    likeTooltip2.style.display = "block";
  }
  setTimeout(function () {
    likeTooltip2.style.display = "none";
  }, 2000);
});

likeIcon.addEventListener("mouseover", function () {
  if (likeIcon.classList.contains("bi-heart")) {
    likeTooltip.textContent = "Aggiungi alla Tua Libreria";
  } else {
    likeTooltip.textContent = "Rimuovi dalla Tua Libreria";
  }
  likeTooltip.style.display = "block";
});

likeIcon.addEventListener("mouseout", function () {
  likeTooltip.style.display = "none";
});

shuffle.addEventListener("click", function () {
  rewind.classList.add("hover");
  if (shuffle.classList.contains("text-success")) {
    shuffle.classList.remove("text-success");
    shuffle.classList.add("hover");
  } else {
    shuffle.classList.add("text-success");
    rewind.classList.remove("text-success");
    shuffle.classList.remove("hover");
  }
});

rewind.addEventListener("click", function () {
  shuffle.classList.add("hover");
  if (rewind.classList.contains("text-success")) {
    rewind.classList.remove("text-success");
    rewind.classList.add("hover");
  } else {
    rewind.classList.add("text-success");
    shuffle.classList.remove("text-success");
    rewind.classList.remove("hover");
  }
});

back.addEventListener("click", function () {
  currentTime = 0;
  audio.currentTime = currentTime;
  clock.innerText = "0:00";
  if (!isPlaying) {
    playPauseButton.click();
  }
});

audio.addEventListener("ended", function () {
  if (rewind.classList.contains("text-success")) {
    audio.currentTime = 0;
    audio.play();
  } else {
    if (isPlaying) {
      playPauseButton.classList.remove("bi-pause-circle-fill");
      playPauseButton.classList.add("bi-play-circle-fill");
    }
  }
  clock.innerText = "0:00";
});

audio.addEventListener("timeupdate", function () {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  const progressBar = document.getElementById("progress-bar");

  const percentCompleted = (currentTime / duration) * 100;

  progressBar.style.width = percentCompleted + "%";

  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);
  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  document.getElementById("timePassed").innerText = formattedTime;
});

audio.volume = volume.value / 100;

volume.addEventListener("input", function () {
  audio.volume = volume.value / 100;
});
