const addressBarContent = new URLSearchParams(location.search);
const artistId = addressBarContent.get("artistId");
console.log(artistId);
const generateEventArtistDetails = function (details) {
  const col = document.getElementById("center-bar");
};

const getSingleArtistDetails = function () {
  fetch("https://striveschool-api.herokuapp.com/api/deezer/artist/" + artistId)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nel caricamento dei dettagli");
      }
    })
    .then((data) => {
      generateArtistDetails(data);
      console.log(data);
    })
    .catch((err) => console.log("ERRORE", err));
};

function generateArtistDetails(artist) {
  const name = document.getElementById("artist-name");
  name.innerText = artist.name;
  const backgroundImg = document.getElementById("background-img");
  backgroundImg.style.backgroundImage = `url(${artist.picture_xl})`;
  const ascoltatori = document.getElementById("nb_fan");
  ascoltatori.innerText = aggiungiPuntini(artist.nb_fan);
}

getSingleArtistDetails();

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

function convertiSecondiAMinutiESecondi(secondi) {
  var minuti = Math.floor(secondi / 60);
  var restantiSecondi = secondi % 60;

  // Aggiungi uno zero iniziale se i secondi sono inferiori a 10
  restantiSecondi =
    restantiSecondi < 10 ? "0" + restantiSecondi : restantiSecondi;

  return minuti + ":" + restantiSecondi;
}

const generateTrackDetails = function (arrayOfTracks) {
  const track = document.getElementById("track-list");
  console.log(arrayOfTracks);
  arrayOfTracks.data.forEach((element, i) => {
    const newLi = document.createElement("li");
    newLi.classList.add("text-secondary", "my-2");
    newLi.innerHTML = `
                    <div class="row d-flex align-items-center" style="opacity:1.0" onmouseover="this.style.opacity=0.5" onmouseout="this.style.opacity=1.0">
                      <div class="col-1 px-0 justify-content-center d-flex">
                      ${i + 1}
                      </div>
                      <div id="witdh-img" class="col-1 pe-0">
                        <img
                          src="${element.album.cover_small}"
                          alt=""
                          class="me-1 my-1"
                          style="width: 40px"
                        />
                      </div>
                      <div class="flex-grow-1 d-lg-flex flex-col flex-lg-row w-25">

                      <div class="col col-8 flex-grow-1 col-lg-4 text-white ms-0 d-flex align-items-center">
                        <h5 class="fs-7 text-start m-0">${element.title}</h5>
                      </div> 
                      <div class="col col-3 text-secondary d-flex align-items-center">
                        <p class="fs-7 text-start m-0">${aggiungiPuntini(
                          element.rank
                        )}</p>
                      </div>
                      </div>
                      <div class="col col-2 text-secondary d-none d-lg-block">
                        <p class="fs-7 m-auto text-center">${convertiSecondiAMinutiESecondi(
                          element.duration
                        )}</p>
                      </div>
                      <div class="col d-lg-none d-flex flex-grow-1 flex-row-reverse">
                        <i class="bi bi-three-dots-vertical text-secondary hover"></i>
                      </div>
                    </div>
    `;

    track.appendChild(newLi);

    // const innmage = getElementById("innmage");
    // const addImage = document.createElement("div");
    // addImage.classList.add = ("col", "col-3");
    // addImage.innerHTML = `
    // <img src="${element.album.cover_small}" class="rounded-circle" alt="" style="width: 50px" />

    // `;

    //innmage.appendChild(addImage);
  });
};

const generateInnmageDetails = function (arrayOfTracks) {
  const innmage = document.getElementById("innmage");
  console.log("array", arrayOfTracks.data[0].album.cover_small);

  const addImage = document.createElement("div");
  addImage.classList.add("row", "my-3", "flex-nowrap");
  addImage.innerHTML = `
    <div class="col col-1 d-flex witdh-image1">
    <img src="${arrayOfTracks.data[0].album.cover_small}" class="rounded-circle mx-1 addImage" alt=""/>
    </div>
    <div
                    class="col col-10 d-flex flex-column justify-content-evenly"
                  >
                    <h5 class="text-white fs-7 m-0">
                      Hai messo mi piace a <span>2</span> brani
                    </h5>
                    <p class="text-secondary fs-7 m-0">Di <span>${arrayOfTracks.data[0].artist.name}</span></p>
                  </div>

    `;

  innmage.appendChild(addImage);
};

const getTrackDetails = function () {
  fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/artist/" +
      artistId +
      "/top?limit=10"
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nel caricamento dei dettagli");
      }
    })
    .then((eventTrackData) => {
      generateTrackDetails(eventTrackData);
      generateInnmageDetails(eventTrackData);
      console.log(eventTrackData);
    })
    .catch((err) => console.log("ERRORE", err));
};

getTrackDetails();
