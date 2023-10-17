const addressBarContent = new URLSearchParams(location.search);
const eventId = addressBarContent.get("eventId");
console.log(eventId);
const generateEventArtistDetails = function (details) {
  const col = document.getElementById("center-bar");
  col.innerHTML = `
  <div class="row">
            <div id="background-img" class="col vh-50" src="${details.picture}">
              <p>
                <i class="bi bi-patch-check-fill text-primary"></i>artista
                verificato
              </p>
              <h1>${details.name}</h1>
              <p>${details.share} ascoltatori mensili</p>
            </div>
            <div class="row bg-dark text-white">
              <div class="col d-flex">
                <i class="bi bi-play-circle-fill text-success m-3"></i>
                <p class="border border-white p-1 m-3">FOLLOWING</p>
                <i class="bi bi-three-dots text-secondary m-3"></i>
              </div>
            </div>
            <div class="row bg-dark text-secondary">
              <div id="Popolari" class="col text-white">
                <h3>Popolari</h3>
                <ol>
                  <li>
                    <div class="row">
                      <div class="col col-1">
                        <img src="${details.picture}" alt="" />
                      </div>
                      <div class="col col-5 text-white">
                        <h5>${details.tracklist}</h5>
                      </div>
                      <div class="col col-4">
                        <p>${details.nb_fan}</p>
                      </div>
                      <div class="col col-2">
                        <p>${details.time}</p>
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
              <div id="Brani che ti piacciono" class="col text-white">
                <h3>Brani che ti piacciono</h3>
                <div class="row">
                  <div class="col col-2">
                    <img
                      src="${details.picture}"
                      class="rounded-circle"
                      alt=""
                    />
                    <span
                      class="position-absolute top-0 start-100 translate-middle p-2 bg-success border border-light rounded-circle"
                      ><i class="bi bi-heart-fill bg-white"></i
                    ></span>
                  </div>
                  <div class="col col-10">
                    <h5 class="text-white">
                      Hai messo mi piace a <span>n brani</span> brani
                    </h5>
                    <p class="text-secondary">
                      Di <span>${details.name}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
};

const getSingleEventArtistDetails = function () {
  fetch("https://striveschool-api.herokuapp.com/api/deezer/artist/" + eventId)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nel caricamento dei dettagli");
      }
    })
    .then((eventData) => {
      generateEventArtistDetails(eventData);
    })
    .catch((err) => console.log("ERRORE", err));
};

getSingleEventArtistDetails();
