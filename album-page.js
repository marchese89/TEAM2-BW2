const addressBarContent = new URLSearchParams(location.search);
const albumId = addressBarContent.get("albumId");
const artistId = false;

const generateImage = function (data) {
  let divCover = document.getElementById("cover-img");
  let imageSrc1 = data;
  console.log(data);
  let imageSrc = imageSrc1.cover_medium;
  console.log(imageSrc1);
  // const cover = document.createElement("img");
  // cover.src = data.cover_medium;
  // cover.setAttribute("crossorigin", "anonymous");
  // cover.setAttribute("onload", "start()");
  // cover.setAttribute("id", "img");

  divCover.innerHTML = `
    <img
      src=${imageSrc}
      id="img"
      crossorigin="anonymous"
      onload="start()"
    />`;
};

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
  generateImage(data);
  const artist = data.artist;
  //CALCOLO LA DATA
  const release = data.release_date;
  const year = release.slice(0, 4);
  //CALCOLO MINUTI E SECONDI
  const totSec = durata(data.duration);

  // divCover.appendChild(cover);

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
  console.log("idartist", id);

  const divArtist = document.createElement("div");
  divArtist.setAttribute("id", "divArtist");
  divArtist.classList.add("d-flex", "flex-row");
  divArtist.innerHTML = `<img src="${artist.picture_small}" id="artistImg" />
  <p id="sottoTitolo"><a class="linkArtist text-white" href="artist-page.html?artistId=${id}">${artist.name}</a><span id=dataBrano> &middot ${year} &middot ${data.nb_tracks} brani,</span><span id="duration"> ${totSec} </span> </p>
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
function aggiungiPuntini(numero) {
  // Converte il numero in una stringa
  var numeroStringa = numero.toString();

  // Dividi la stringa in gruppi di tre cifre da destra a sinistra
  var gruppi = [];
  while (numeroStringa.length > 0) {
    gruppi.unshift(numeroStringa.slice(-3));
    numeroStringa = numeroStringa.slice(0, -3);
  }

  // Unisci i gruppi con i puntini
  return gruppi.join(".");
}
const renderList = function (data) {
  const track = data.tracks.data;
  console.log(track);

  const divTrack = document.getElementById("trackList");
  track.forEach((element, index) => {
    const totSec = trackDurata(element.duration);
    const divRow = document.createElement("div");
    divRow.classList.add("row", "align-items-center");
    divRow.setAttribute("id", "rigaTrack");
    const rankPuntato = element.rank;

    divRow.innerHTML = `<div  class="col-auto text-start me-2 "><span>${
      index + 1
    }<i class="bi bi-play-fill text-white hidden"></i></span>
    
                        </div>
                       <div class="col-6 colMargin">
                         <div class="row">
                          <div onclick="  funzione(${
                            element.id
                          })" class="col-12 text-white">${element.title}</div>
                          <div class="col-12">
                          <a class="linkArtist" href="artist-page.html?artistId=${
                            element.artist.id
                          }">${element.artist.name}</a></div>
                         </div>
                       </div>
                 <div class="col-2 me-auto text-end ripr">${aggiungiPuntini(
                   rankPuntato
                 )}</div>
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
  })
  .catch((err) => {
    console.log("Si è verificato un errore:", err);
  });

var referrer = document.referrer;
var previousPage = localStorage.getItem("previousPage");
localStorage.setItem("previousPage", window.location.href);
console.log("Pagina di provenienza: " + referrer);
console.log("Pagina visitata precedentemente: " + previousPage);

// crea un canvas con l'immagine e ne ritorno il context 2d
const draw = function (img) {
  let canvas = document.createElement("canvas");
  let c = canvas.getContext("2d");
  c.width = canvas.width = img.clientWidth;
  c.height = canvas.height = img.clientHeight;
  c.clearRect(0, 0, c.width, c.height);
  c.drawImage(img, 0, 0, img.clientWidth, img.clientHeight);
  return c;
};

// scompone pixel per pixel e ritorna un oggetto con una mappa della loro frequenza nell'immagine
const getColors = function (c) {
  let col,
    colors = {};
  let pixels, r, g, b, a;
  r = g = b = a = 0;
  pixels = c.getImageData(0, 0, c.width, c.height);
  for (let i = 0, data = pixels.data; i < data.length; i += 4) {
    r = data[i];
    g = data[i + 1];
    b = data[i + 2];
    a = data[i + 3];
    if (a < 255 / 2) continue;
    col = rgbToHex(r, g, b);
    if (!colors[col]) colors[col] = 0;
    colors[col]++;
  }
  return colors;
};

// trova il colore più ricorrente data una mappa di frequenza dei colori
const findMostRecurrentColor = function (colorMap) {
  let highestValue = 0;
  let mostRecurrent = null;
  for (const hexColor in colorMap) {
    if (colorMap[hexColor] > highestValue) {
      mostRecurrent = hexColor;
      highestValue = colorMap[hexColor];
    }
  }
  return mostRecurrent;
};

// converte un valore in rgb a un valore esadecimale
const rgbToHex = function (r, g, b) {
  if (r > 255 || g > 255 || b > 255) {
    throw "Invalid color component";
  } else {
    return ((r << 16) | (g << 8) | b).toString(16);
  }
};

// inserisce degli '0' se necessario davanti al colore in esadecimale per renderlo di 6 caratteri
const pad = function (hex) {
  return ("000000" + hex).slice(-6);
};
function adjustBrightness(hexColor, factor) {
  // Rimuovi il carattere '#' dall'esadecimale
  hexColor = hexColor.replace("#", "");

  // Estrai i valori delle componenti RGB
  const r = parseInt(hexColor.slice(0, 2), 16);
  const g = parseInt(hexColor.slice(2, 4), 16);
  const b = parseInt(hexColor.slice(4, 6), 16);

  // Calcola la luminosità attuale
  const luminosity = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Calcola i nuovi valori delle componenti RGB
  const newR = Math.min(255, r + factor);
  const newG = Math.min(255, g + factor);
  const newB = Math.min(255, b + factor);

  // Converte i nuovi valori in una stringa esadecimale
  const newHexColor = `#${newR.toString(16)}${newG.toString(16)}${newB.toString(
    16
  )}`;

  return newHexColor;
}

function isColorNearBlack(hexColor, threshold = 0.12) {
  // Rimuovi il carattere '#' dall'esadecimale
  hexColor = hexColor.replace("#", "");

  // Estrai i valori delle componenti RGB
  const r = parseInt(hexColor.slice(0, 2), 16) / 255;
  const g = parseInt(hexColor.slice(2, 4), 16) / 255;
  const b = parseInt(hexColor.slice(4, 6), 16) / 255;

  // Calcola la luminosità
  const luminosity = 0.299 * r + 0.587 * g + 0.114 * b;
  console.log(luminosity);

  // Confronta con la soglia
  return luminosity < threshold;
}

const setBackground = function (color) {
  const div1 = document.getElementById("provacolore");
  console.log(color);
  hexColor = "#" + color;
  console.log(hexColor);
  isNear = isColorNearBlack(hexColor);
  if (isNear) {
    newColor = adjustBrightness(hexColor, 60);
    console.log(newColor);
    div1.style.background = `linear-gradient(0deg, rgba(32, 32, 32, 1) -20%, ${newColor} 120%)`;
    const div2 = document.getElementById("songList");
    div2.style.background = `linear-gradient(180deg, ${newColor} -60%,rgb(32, 32, 32) 17% )`;
  } else {
    div1.style.background = `linear-gradient(0deg, rgba(32, 32, 32, 1) -20%, #${color} 120%)`;
    const div2 = document.getElementById("songList");
    div2.style.background = `linear-gradient(
    180deg,
    #${color} -60%,
    rgb(32, 32, 32) 17%
  )`;
  }
};

const start = function () {
  // prendo il riferimento all'immagine del dom
  let imgReference = document.querySelector("#img");

  // creo il context 2d dell'immagine selezionata
  let context = draw(imgReference);

  // creo la mappa dei colori più ricorrenti nell'immagine
  let allColors = getColors(context);

  // trovo colore più ricorrente in esadecimale
  let mostRecurrent = findMostRecurrentColor(allColors);

  // se necessario, aggiunge degli '0' per rendere il risultato un valido colore esadecimale
  let mostRecurrentHex = pad(mostRecurrent);
  setBackground(mostRecurrentHex);
  // console.log del risultato
  console.log(mostRecurrentHex);
};

const pages = JSON.parse(sessionStorage.getItem("pages"));
console.log("pagine", pages);
pages.album = "album-page.html?albumId=" + albumId;
sessionStorage.setItem("pages", JSON.stringify(pages));

function backPage() {
  const prevPage = JSON.parse(sessionStorage.getItem("pages"));
  const p = prevPage.home;
  location.href = p;
}

const frecciaSinistra = document.querySelector(".bi.bi-chevron-left");
frecciaSinistra.addEventListener("click", function () {
  backPage();
});

const frecciaDestra = document.querySelector(".bi.bi-chevron-right");
frecciaDestra.style.cursor = "not-allowed";

if (pages.artist != null) {
  frecciaDestra.style.cursor = "pointer";
  frecciaDestra.addEventListener("click", function () {
    const pages = JSON.parse(sessionStorage.getItem("pages"));
    const forward = pages.artist;
    sessionStorage.setItem("pages", JSON.stringify(pages));
    location.href = forward;
  });
}

const prevPage = JSON.parse(sessionStorage.getItem("pages"));
if (prevPage.artist != null) {
  frecciaDestra.style.cursor = "pointer";
}

//animiamo la freccia dietro
const leftArrMobile = document.getElementById("arrowBack");
leftArrMobile.addEventListener("click", function () {
  console.log("entro nella freccia sinistra");
  backPage();
});

//gestione della ricerca
const _search = document.getElementById("search");
_search.addEventListener("keypress", function (event) {
  const searchQuery = _search.value;

  if (event.key === "Enter" && searchQuery.length > 0) {
    sessionStorage.setItem("search", JSON.stringify({ s: searchQuery }));
    location.href = "home-page.html";
  }
});
