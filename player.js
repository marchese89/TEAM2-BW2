const playPauseButton = document.getElementById("play-pause-button");

playPauseButton.addEventListener("click", function () {
  if (playPauseButton.classList.contains("bi-play-circle-fill")) {
    playPauseButton.classList.remove("bi-play-circle-fill");
    playPauseButton.classList.add("bi-pause-circle-fill");
  } else {
    playPauseButton.classList.remove("bi-pause-circle-fill");
    playPauseButton.classList.add("bi-play-circle-fill");
  }
});

const likeIcon = document.getElementById("like-icon");
const likeTooltip = document.getElementById("like-tooltip");
const likeTooltip2 = document.getElementById("like-tooltip2");
const shaker = document.querySelector(".shacker");

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
  }, 1000);
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
