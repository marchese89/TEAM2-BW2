async function search(query) {
  try {
    const res = await fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/search?q=" + query
    );
    if (res.ok) {
      const data = await res.json();
      const randoms = JSON.parse(sessionStorage.getItem("randoms"));
      let random;
      if (randoms != null) {
        random = randoms[0];
      } else {
        random = Math.floor(Math.random() * 25);
        sessionStorage.setItem("randoms", JSON.stringify([random]));
      }

      firtsAlbum(data.data[random]);
      sixAlbums(data.data, data.data[random].album.id);
    } else {
      throw new Error("Risposta non OK");
    }
  } catch (error) {
    console.log(error);
  }
}

search("pop");

function firtsAlbum(data) {
  artistId = data.artist.id;
  const img = document.querySelector("#first-album div img");
  img.setAttribute("src", data.album.cover_medium);
  const title = document.getElementById("album-title");
  title.innerText = data.album.title;
  const artist = document.getElementById("artist");
  artist.innerText = data.artist.name;
  const slogan = document.querySelector("#slogan span");
  slogan.innerText = data.artist.name;
  const imgFirstAlbum = document.getElementById("first-album-img");
  imgFirstAlbum.addEventListener("click", function () {
    goToAlbum(data.album.id);
  });
}

function sixAlbums(data, e_random) {
  const used = [];
  used.push(e_random);
  const randoms = JSON.parse(sessionStorage.getItem("randoms"));
  for (let i = 1; i <= 6; i++) {
    const elem = document.getElementById(`album${i}`);
    const imgAlbum = elem.querySelector("img");
    imgAlbum.style.cursor = "pointer";

    let random;

    if (randoms[i] == undefined) {
      random = Math.floor(Math.random() * 25);
      while (used.includes(data[random].album.id)) {
        random = Math.floor(Math.random() * 25);
      }
      randoms[i] = random;
    } else {
      random = randoms[i];
    }
    imgAlbum.addEventListener("click", function () {
      goToAlbum(data[random].album.id);
    });
    used.push(data[random].album.id);
    const img = elem.querySelector("div img");
    img.setAttribute("src", data[random].album.cover);
    const search = elem.querySelector("p");
    search.innerText = data[random].album.title;
  }
  sessionStorage.setItem("randoms", JSON.stringify(randoms));
  for (let i = 1; i <= 6; i++) {
    const elem = document.getElementById(`album-mobile-${i}`);
    elem.style.cursor = "pointer";
    let random = randoms[i];
    // used.push(data[random].album.id);
    const img = elem.querySelector("div img");
    img.setAttribute("src", data[random].album.cover);
    const search = elem.querySelector("p");
    search.innerText = reduceText(data[random].album.title, 13);
    elem.addEventListener("click", function () {
      goToAlbum(data[random].album.id);
    });
  }
  return used;
}

function reduceText(testo, lunghezzaMassima) {
  // Verifica se la lunghezza del testo supera quella massima
  if (testo.length > lunghezzaMassima) {
    // Accorcia il testo e aggiunge puntini alla fine
    return testo.slice(0, lunghezzaMassima) + "...";
  } else {
    // Restituisci il testo inalterato se non supera la lunghezza massima
    return testo;
  }
}

async function loadAlbums(query) {
  try {
    const res = await fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/search?q=" + query
    );
    if (res.ok) {
      const data = await res.json();
      mainAlbums(data.data);
    } else {
      throw new Error("Risposta non OK");
    }
  } catch (error) {
    console.log(error);
  }
}

loadAlbums("rock");

function mainAlbums(data) {
  const mainAlbums = document.getElementById("main-albums");
  const mainAlbumsMobile = document.getElementById("big-albums-mobile");
  mainAlbums.innerHTML = "";
  mainAlbumsMobile.innerHTML = "";
  data.forEach((d) => {
    const newCol = document.createElement("div");
    newCol.classList.add("col", "out-banner");
    newCol.innerHTML = `
    <div class="card big-banner">
                  <div>
                    <img src="${d.album.cover_xl}" alt="" class="w-100" onclick="goToAlbum('${d.album.id}')"/>
                  </div>
                  <div>
                    <h6 class="mt-3">${d.album.title}</h6>
                    <p></p>
                  </div>
                </div>
    `;
    mainAlbums.appendChild(newCol);

    //per il mobile
    const newColMobile = document.createElement("div");
    newColMobile.classList.add("big-banner", "d-flex", "flex-column", "mb-3");
    newColMobile.innerHTML = `
    <div class="d-flex">
                    <div class="d-flex align-items-center">
                      <img src="${d.album.cover}" alt="" onclick="goToAlbum('${d.album.id}')"/>
                    </div>
                    <div
                      class="d-flex flex-grow-1 justify-content-start ms-3 align-items-center"
                    >
                      <h6 class="mt-3">${d.album.title}</h6>
                      <p></p>
                    </div>
                  </div>
                  <div
                    class="out-banner-bottom m-2 d-flex justify-content-between"
                  >
                    <div>
                      <i class="bi bi-heart-fill fs-4"></i>
                      <i class="bi bi-three-dots-vertical fs-4"></i>
                    </div>
                    <div class="play-mobile">
                      <i class="bi bi-play-fill fs-4"></i>
                    </div>
                  </div>
    `;
    mainAlbumsMobile.appendChild(newColMobile);
  });
}

function goToAlbum(id) {
  location.href = `album-page.html?albumId=${id}`;
  const pages = JSON.parse(sessionStorage.getItem("pages"));
  pages.home = "home-page.html";
  sessionStorage.setItem("pages", JSON.stringify(pages));
}

const _search = document.getElementById("search");
_search.addEventListener("keypress", function (event) {
  const searchQuery = _search.value;

  if (event.key === "Enter" && searchQuery.length > 0) {
    seachOp(searchQuery);
  }
});

function seachOp(searchQuery) {
  const stAllbum = document.getElementById("first-album");
  stAllbum.classList.add("d-none");
  const bs = document.getElementById("bs");
  bs.classList.add("d-none");
  const sixAlbums = document.getElementById("six-albums");
  sixAlbums.classList.add("d-none");
  const altro = document.getElementById("altro");
  altro.innerText = `Risultati della Ricerca di "${searchQuery}"...`;
  loadAlbums(searchQuery);
}

const frecciaSinistra = document.querySelector(".bi.bi-chevron-left");
frecciaSinistra.style.cursor = "not-allowed";
const frecciaDestra = document.querySelector(".bi.bi-chevron-right");
frecciaDestra.style.cursor = "not-allowed";

//riferimento alle pagine precedenti
const pages = JSON.parse(sessionStorage.getItem("pages"));
if (pages == null) {
  sessionStorage.setItem("pages", JSON.stringify({}));
}

if (pages.album != null) {
  frecciaDestra.style.cursor = "pointer";
  frecciaDestra.addEventListener("click", function () {
    const pages = JSON.parse(sessionStorage.getItem("pages"));
    const forward = pages.album;
    pages.home = "home-page.html";
    sessionStorage.setItem("pages", JSON.stringify(pages));
    location.href = forward;
  });
}

const search_ = JSON.parse(sessionStorage.getItem("search"));
if (search_ != null) {
  _search.value = search_.s;
  sessionStorage.removeItem("search");
  seachOp(search_.s);
}
