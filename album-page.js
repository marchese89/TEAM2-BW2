const addressBarContent = new URLSearchParams(location.search);
const albumId = addressBarContent.get("albumId");

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

  if (ore < 1) {
    const minuti = Math.floor(secondi / 60);
    const secondiRimanenti = secondi % 60;

    const min = minuti < 10 ? "0" + minuti : minuti;
    const sec =
      secondiRimanenti < 10 ? "0" + secondiRimanenti : secondiRimanenti;
    return minuti + " min " + sec + " sec.";
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
  type.setAttribute("id", "type");
  const typeVal = data.type[0].toUpperCase() + data.type.slice(1);
  type.innerText = typeVal;
  divDescr.appendChild(type);
  const albumTitle = document.createElement("h1");
  albumTitle.innerText = data.title;
  divDescr.appendChild(albumTitle);

  const id = artist.id;
  console.log(id);

  const divArtist = document.createElement("div");
  divArtist.setAttribute("id", "divArtist");
  divArtist.classList.add("d-flex", "flex-row");
  divArtist.innerHTML = `<img src="${artist.picture_small}" id="artistImg" />
  <p id="sottoTitolo"><a class="linkArtist text-white" href="artist-page.html?artistId="${id}>${artist.name}</a><span id=dataBrano> &middot ${year} &middot ${data.nb_tracks} brani,</span><span id="duration"> ${totSec} </span> </p>
  `;
  const divHidden = document.createElement("div");
  divHidden.setAttribute("id", "divHidden");
  divHidden.classList.add("d-flex", "flex-row");
  divHidden.innerHTML = `
  <span id=spanHidden>${typeVal} &middot ${year}</span>
  `;

  divDescr.appendChild(divArtist);
  divDescr.appendChild(divHidden);
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
    divRow.setAttribute("id", "rigaTrack");
    divRow.innerHTML = `<div class="col-auto text-start me-2 "><span>${
      index + 1
    }<i class="bi bi-play-fill text-white hidden"></i></span>
    
                        </div>
                       <div class="col-6 colMargin">
                         <div class="row">
                          <div class="col-12 text-white">${element.title}</div>
                          <div class="col-12">
                          <a class="linkArtist" href="artist-page.html?artistId=${
                            element.artist.id
                          }">${element.artist.name}</a></div>
                         </div>
                       </div>
                 <div class="col-2 me-auto text-end ripr">${element.rank}</div>
                 <div class="col-auto heart"><i class="bi bi-heart text-white hidden"></i></div>
                 <div class="col-auto" id="secHidden">${totSec}</div>
                 <div class="col-auto trep"><i class="bi bi-three-dots text-white hidden"></i></div>
                 <div class="col-auto" id="trepH"><i class="bi bi-three-dots-vertical text-white"></i></div>`;
    divTrack.appendChild(divRow);

    divRow.addEventListener("mouseover", () => {
      const numSpan = divRow.querySelector(".col-auto.text-start span");
      const playIcon = divRow.querySelector(
        ".col-auto.text-start .bi-play-fill"
      );
      const heartIcon = divRow.querySelector(".col-auto.heart .bi-heart");
      const trepIcon = divRow.querySelector(".col-auto.trep .bi-three-dots");

      numSpan.style.visibility = "hidden"; // Nascondi il numero
      playIcon.style.visibility = "visible"; // Mostra l'icona di play
      heartIcon.style.visibility = "visible";
      trepIcon.style.visibility = "visible";
      divRow.querySelector(".linkArtist").classList.add("text-white");
    });

    divRow.addEventListener("mouseout", () => {
      const numSpan = divRow.querySelector(".col-auto.text-start span");
      const playIcon = divRow.querySelector(
        ".col-auto.text-start .bi-play-fill"
      );
      const heartIcon = divRow.querySelector(".col-auto.heart .bi-heart");
      const trepIcon = divRow.querySelector(".col-auto.trep .bi-three-dots");

      numSpan.style.visibility = "visible"; // Mostra di nuovo il numero
      playIcon.style.visibility = "hidden"; // Nascondi l'icona di play
      heartIcon.style.visibility = "hidden";
      trepIcon.style.visibility = "hidden";
      divRow.querySelector(".linkArtist").classList.remove("text-white");
    });
  });
};

const url = "https://striveschool-api.herokuapp.com/api/deezer/album/75621062";

// const trovaAnno = function (id) {
//   fetch("https://striveschool-api.herokuapp.com/api/deezer/album/" + id, {})
//     .then((res) => {
//       console.log("Response ottenuta dalla GET", res);
//       if (res.ok) {
//         // la chiamata è terminata correttamente con un 200
//         console.log("ok");
//         return res.json();
//       } else {
//         throw new Error("Errore nel contattare il server");
//       }
//     })
//     .then((id) => {
//       console.log("ForId", id);
//       const release = id.release_date;
//       const year = release.slice(0, 4);
//       console.log(year);
//       return year;
//     })
//     .catch((err) => {
//       console.log("Si è verificato un errore:", err);
//     });
// };
const renderTitle = function (data) {
  const y = data.data;
  console.log("y", y);
  const id = y[0].artist.id;
  //RENDERIZZA TITOLO E COLLEGAMENTO ALLA PAGINA ARTISTA
  const divRowTitolo = document.getElementById("titoloAlbumCorrelati");
  const h4 = document.createElement("h4");
  const aH4 = document.createElement("a");
  aH4.setAttribute("href", "artist-page.html?artistId=" + id);
  const prova = y[0].artist.name;
  console.log("prova", prova);
  h4.innerText = "Altro di " + prova;
  aH4.appendChild(h4);
  divRowTitolo.appendChild(aH4);

  const a = document.createElement("a");

  console.log(id);
  a.setAttribute("href", "artist-page.html?artistId=" + id);
  a.innerText = "Vedi discografia";
  divRowTitolo.appendChild(a);
};

const renderCard = function (data) {
  const x = data.data;
  console.log("x", x);

  //RENDERIZZA CARD CON TITOLO E ANNO(?)

  const divRow = document.getElementById("albumCorrelati");
  divRow.innerHTML = "";
  const screenWidth = window.innerWidth;

  const numCard = Math.floor(screenWidth / 350);
  for (let i = 0; i < numCard; i++) {
    const divCol = document.createElement("div");
    const titolo = x[i].album.title;
    const img = x[i].album.cover;
    const id = x[i].album.id;
    console.log("ciao", id);

    // const year = trovaAnno(id);
    // console.log(year);

    divCol.classList.add("col");
    divCol.innerHTML = `<div class="card">
                           <img src="${img}" class="card-img-top rounded" alt="...">
                       <div class="card-body  px-0" my-1>
                          <h5 class="card-title text-truncate text-white">${titolo}</h5>
                          <p class="card-text text-white">Anno?</p>
                       </div>
                    </div>`;
    divRow.appendChild(divCol);

    divCol.addEventListener("click", function () {
      location.href = `album-page.html?albumId=${id}`;
    });
  }
};

const cardCreator = function (data) {
  const name = data.artist.name;
  console.log("provaprova", name);

  fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=" + name,
    {}
  )
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
      console.log("Album2", data);
      renderCard(data);
      window.addEventListener("resize", function () {
        renderCard(data);
      });
      renderTitle(data);
    })
    .catch((err) => {
      console.log("Si è verificato un errore:", err);
    });
};

fetch("https://striveschool-api.herokuapp.com/api/deezer/album/" + albumId, {})
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
    cardCreator(data);
  })
  .catch((err) => {
    console.log("Si è verificato un errore:", err);
  });

var referrer = document.referrer;
var previousPage = localStorage.getItem("previousPage");
localStorage.setItem("previousPage", window.location.href);
console.log("Pagina di provenienza: " + referrer);
console.log("Pagina visitata precedentemente: " + previousPage);
