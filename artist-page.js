const addressBarContent = new URLSearchParams(location.search);
const eventId = addressBarContent.get("eventId");
console.log(eventId);
const generateEventArtistDetails = function (details) {
  const col = document.getElementById("center-bar");
  col.innerHTML = `
  <div class="row">
            <div
              id="background-img"
              class="col d-flex flex-column justify-content-end"
              style="
                background-image: url(${details.picture});
                height: 300px;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
              "
            >
              <div id="description">
                <p class="text-white d-flex align-items-center">
                  <i
                    class="bi bi-patch-check-fill text-primary play-button me-2"
                  ></i
                  >artista verificato
                </p>
                <h1 class="text-white">${details.name}</h1>
                <p class="text-white">${details.nb_fan} ascoltatori mensili</p>
              </div>
            </div>
            <div class="row bg-dark text-white">
              <div class="col d-flex">
                <div class="d-flex align-items-center">
                  <i
                    class="bi bi-play-circle-fill text-success m-3 play-button"
                  ></i>
                </div>
                <div class="d-flex align-items-center">
                  <p class="border border-white p-1 m-3">FOLLOWING</p>
                </div>
                <div class="d-flex align-items-center">
                  <i class="bi bi-three-dots text-secondary m-3"></i>
                </div>
              </div>
            </div>
            <div class="row bg-dark text-secondary">
              <div id="Popolari" class="col text-white">
                <h3>Popolari</h3>
                <ol class="mb-0">
                  <li class="text-secondary">
                    <div class="row d-flex align-items-center">
                      <div class="col-1">
                        <img
                          src="${details.picture}"
                          alt=""
                          class="m-1"
                          style="width: 30px"
                        />
                      </div>

                      <div class="col col-5 text-white">
                        <h5 class="fs-7 m-auto text-start">${details.tracklist}</h5>
                      </div>
                      <div class="col col-4 text-secondary">
                        <p class="fs-7 m-auto text-center">${details.nb_fan}</p>
                      </div>
                      <div class="col col-2 text-secondary">
                        <p class="fs-7 m-auto text-center">${details.time}</p>
                      </div>
                    </div>
                  </li>
                  <li class="text-secondary">
                    <div class="row d-flex align-items-center">
                      <div class="col-1">
                        <img
                          src="${details.picture}"
                          alt=""
                          class="m-1"
                          style="width: 30px"
                        />
                      </div>

                      <div class="col col-5 text-white">
                        <h5 class="fs-7 m-auto text-start">${details.tracklist}</h5>
                      </div>
                      <div class="col col-4 text-secondary">
                        <p class="fs-7 m-auto text-center">${details.nb_fan}</p>
                      </div>
                      <div class="col col-2 text-secondary">
                        <p class="fs-7 m-auto text-center">${details.time}</p>
                      </div>
                    </div>
                  </li>
                  <li class="text-secondary">
                    <div class="row d-flex align-items-center">
                      <div class="col-1">
                        <img
                          src="${details.picture}"
                          alt=""
                          class="m-1"
                          style="width: 30px"
                        />
                      </div>

                      <div class="col col-5 text-white">
                        <h5 class="fs-7 m-auto text-start">${details.tracklist}</h5>
                      </div>
                      <div class="col col-4 text-secondary">
                        <p class="fs-7 m-auto text-center">${details.nb_fan}</p>
                      </div>
                      <div class="col col-2 text-secondary">
                        <p class="fs-7 m-auto text-center">${details.time}</p>
                      </div>
                    </div>
                  </li>
                  <li class="text-secondary">
                    <div class="row d-flex align-items-center">
                      <div class="col-1">
                        <img
                          src="${details.picture}"
                          alt=""
                          class="m-1"
                          style="width: 30px"
                        />
                      </div>

                      <div class="col col-5 text-white">
                        <h5 class="fs-7 m-auto text-start">${details.tracklist}</h5>
                      </div>
                      <div class="col col-4 text-secondary">
                        <p class="fs-7 m-auto text-center">${details.nb_fan}</p>
                      </div>
                      <div class="col col-2 text-secondary">
                        <p class="fs-7 m-auto text-center">${details.time}</p>
                      </div>
                    </div>
                  </li>
                  <li class="text-secondary">
                    <div class="row d-flex align-items-center">
                      <div class="col-1">
                        <img
                          src="${details.picture}"
                          alt=""
                          class="m-1"
                          style="width: 30px"
                        />
                      </div>

                      <div class="col col-5 text-white">
                        <h5 class="fs-7 m-auto text-start">${details.tracklist}</h5>
                      </div>
                      <div class="col col-4 text-secondary">
                        <p class="fs-7 m-auto text-center">${details.nb_fan}</p>
                      </div>
                      <div class="col col-2 text-secondary">
                        <p class="fs-7 m-auto text-center">${details.time}</p>
                      </div>
                    </div>
                  </li>
                  
                </ol>
              </div>
              <div id="Brani che ti piacciono" class="col col-4 text-white">
                <h3 class="text-nowrap">Brani che ti piacciono</h3>
                <div class="row">
                  <div class="col col-3">
                    <img
                      src="${details.picture}"
                      class="rounded-circle"
                      alt=""
                      style="width: 50px"
                    />
                  </div>
                  <div
                    class="col col-9 d-flex flex-column justify-content-evenly"
                  >
                    <h5 class="text-white fs-7 m-0">
                      Hai messo mi piace a <span>n brani</span> brani
                    </h5>
                    <p class="text-secondary fs-7 m-0">
                      Di <span>${details.name}</span>
                    </p>
                  </div>
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
      console.log(eventData);
    })
    .catch((err) => console.log("ERRORE", err));
};

getSingleEventArtistDetails();

const generateEventTrackDetails = function (arrayOfTracks) {
  console.log(arrayOfTracks);
  arrayOfTracks.data.forEach((element) => {
    const newLi = document.createElement("li");
    newLi.classList.add = "text-secondary";
    newLi.innerHTML = `
    <li class="text-secondary">
                    <div class="row d-flex align-items-center">
                      <div class="col-1">
                        <img
                          src="${element.album.cover}"
                          alt=""
                          class="m-1"
                          style="width: 30px"
                        />
                      </div>

                      <div class="col col-5 text-white">
                        <h5 class="fs-7 m-auto text-start">${element.contributors.title}</h5>
                      </div>
                      <div class="col col-4 text-secondary">
                        <p class="fs-7 m-auto text-center">${element.contributors.rank}</p>
                      </div>
                      <div class="col col-2 text-secondary">
                        <p class="fs-7 m-auto text-center">${element.contributors.duration}</p>
                      </div>
                    </div>
                  </li>

    `;

    const track = getElementById("track");
    track.appendChild(newLi);
  });
};

const getEventTrackDetails = function () {
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
      generateEventTrackDetails(eventTrackData);
      console.log(eventTrackData);
    })
    .catch((err) => console.log("ERRORE", err));
};

getEventTrackDetails();
