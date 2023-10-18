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
    newLi.classList.add = "text-secondary";
    newLi.innerHTML = `
                    <div class="row d-flex align-items-center">
                      <div class="col-1 px-0 justify-content-end d-flex">
                      ${i + 1}
                      </div>
                      <div class="col-2">
                        <img
                          src="${element.album.cover_small}"
                          alt=""
                          class="me-1 my-1"
                          style="width: 40px"
                        />
                      </div>

                      <div class="col col-4 text-white">
                        <h5 class="fs-7 m-auto text-start">${element.title}</h5>
                      </div>
                      <div class="col col-4 text-secondary">
                        <p class="fs-7 m-auto text-center">${aggiungiPuntini(
                          element.rank
                        )}</p>
                      </div>
                      <div class="col col-1 text-secondary">
                        <p class="fs-7 m-auto text-center">${convertiSecondiAMinutiESecondi(
                          element.duration
                        )}</p>
                      </div>
                    </div>
    `;

    track.appendChild(newLi);
  });
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
      console.log(eventTrackData);
    })
    .catch((err) => console.log("ERRORE", err));
};

getTrackDetails();
