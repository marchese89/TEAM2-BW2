const addressBarContent = new URLSearchParams(location.search);
const eventId = addressBarContent.get("eventId");
console.log(eventId);
const generateEventArtistDetails = function (details) {
  const col = document.getElementById("center-bar");
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
