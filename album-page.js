// const renderBg = function (img) {
//   fetch(img)
//     .then((response) => response.blob())
//     .then((blob) => {
//       const reader = new FileReader();

//       reader.onload = function () {
//         localStorage.setItem("downloadImage", reader.result);
//         const img = new Image();
//         img.src = reader.result;
//         img.onload = function () {
//           const canvas = document.createElement("canvas");
//           const ctx = canvas.getContext("2d");

//           canvas.width = img.width;
//           canvas.height = img.height;
//           ctx.drawImage(img, 0, 0, img.width, img.height);

//           const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
//           const numPixels = img.width * img.height;

//           let totalRed = 0;
//           let totalGreen = 0;
//           let totalBlue = 0;

//           for (let i = 0; i < numPixels; i++) {
//             totalRed += imageData[i * 4]; // R channel
//             totalGreen += imageData[i * 4 + 1]; // G channel
//             totalBlue += imageData[i * 4 + 2]; // B channel
//           }

//           const avgRed = Math.round(totalRed / numPixels);
//           const avgGreen = Math.round(totalGreen / numPixels);
//           const avgBlue = Math.round(totalBlue / numPixels);

//           const backgroundColor = `rgb(${avgRed}, ${avgGreen}, ${avgBlue})`;

//           // Imposta il colore medio come sfondo del div
//           const divCover = document.getElementById("div-Album");
//           divCover.style.backgroundColor = backgroundColor;
//         };
//       };
//       reader.readAsDataURL(blob);
//     })
//     .catch((error) => {
//       console.error("errore");
//     });
// };
const durata = function (secondi) {
  const ore = Math.floor(secondi / 3600);
  console.log(ore);
  if (ore < 1) {
    const minuti = Math.floor(secondi / 60);
    const secondiRimanenti = secondi % 60;

    const min = minuti < 10 ? "0" + minuti : minuti;
    const sec =
      secondiRimanenti < 10 ? "0" + secondiRimanenti : secondiRimanenti;
    return min + " min " + sec + " sec.";
  } else {
    minuti = Math.floor((secondi % 3600) / 60);
    secondiRimanenti = secondi % 60;
    min = minuti < 10 ? "0" + minuti : minuti;
    return ore + " ora " + min + " min.";
  }
};
const trackDurata = function (secondi) {
  const minuti = Math.floor(secondi / 60);
  const secondiRimanenti = secondi % 60;

  const sec = secondiRimanenti < 10 ? "0" + secondiRimanenti : secondiRimanenti;
  return minuti + ":" + sec;
};

const renderAlbum = function (data) {
  const divCover = document.getElementById("cover-img");
  const cover = document.createElement("img");
  cover.src = data.cover_medium;
  const artist = data.artist;
  //CALCOLO LA DATA
  const release = data.release_date;
  const year = release.slice(0, 4);
  //CALCOLO MINUTI E SECONDI
  const totSec = durata(data.duration);

  divCover.appendChild(cover);

  const divDescr = document.getElementById("album-description");
  const type = document.createElement("p");
  type.innerText = data.type[0].toUpperCase() + data.type.slice(1);
  divDescr.appendChild(type);
  const albumTitle = document.createElement("h1");
  albumTitle.innerText = data.title;
  divDescr.appendChild(albumTitle);

  const divArtist = document.getElementById("divArtist");
  divArtist.innerHTML = `<img src="${artist.picture_small}" id="artistImg" />
  <p>${artist.name} &middot ${year} &middot ${data.nb_tracks} brani,<span id="duration"> ${totSec} </span> </p>
  `;
  //   renderBg(data.cover);
};

const renderList = function (data) {
  const track = data.tracks.data;
  console.log(track);

  const divTrack = document.getElementById("trackList");
  track.forEach((element, index) => {
    const totSec = trackDurata(element.duration);
    const divRow = document.createElement("div");
    divRow.classList.add("row", "align-items-center");
    divRow.innerHTML = `<div class="col-auto text-start me-1">${index + 1}</div>
                <div class="col-6">
                  <div class=row>
                     <div class="col-12 text-white">${element.title}</div>
                     <div class="col-12">${element.artist.name}</div>
                  </div>
                  </div>
                <div class="col-2 me-auto text-end">${element.rank}</div>
                <div class="col-auto">${totSec}</div>`;
    divTrack.appendChild(divRow);
  });
};

fetch("https://striveschool-api.herokuapp.com/api/deezer/album/75621062", {})
  .then((res) => {
    console.log("Response ottenuta dalla GET", res);
    if (res.ok) {
      // la chiamata è terminata correttamente con un 200
      console.log("ok");
      return res.json();
    } else {
      throw new Error("Errore nel contattare il server");
    }
  })
  .then((data) => {
    console.log("Album", data);
    renderAlbum(data);
    renderList(data);
  })
  .catch((err) => {
    console.log("Si è verificato un errore:", err);
  });
const url = "https://striveschool-api.herokuapp.com/api/deezer/album/75621062";
