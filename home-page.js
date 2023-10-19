async function search(query) {
  try {
    const res = await fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/search?q=" + query
    );
    if (res.ok) {
      const data = await res.json();
      const random = Math.floor(Math.random() * 25);
      firtsAlbum(data.data[random]);
      sixAlbums(data.data, data.data[random].album.id);
      console.log(data);
    } else {
      throw new Error("Risposta non OK");
    }
  } catch (error) {
    console.log(error);
  }
}

search("pop");

function firtsAlbum(data) {
  const img = document.querySelector("#first-album div img");
  img.setAttribute("src", data.album.cover_medium);
  const title = document.getElementById("album-title");
  title.innerText = data.album.title;
  const artist = document.getElementById("artist");
  artist.innerText = data.artist.name;
  const slogan = document.querySelector("#slogan span");
  slogan.innerText = data.artist.name;
}

function sixAlbums(data, e_random) {
  const used = [];
  used.push(e_random);
  for (let i = 1; i <= 6; i++) {
    const elem = document.getElementById(`album${i}`);
    let random = Math.floor(Math.random() * 25);
    while (used.includes(data[random].album.id)) {
      random = Math.floor(Math.random() * 25);
    }
    used.push(data[random].album.id);
    const img = elem.querySelector("div img");
    img.setAttribute("src", data[random].album.cover);
    const search = elem.querySelector("p");
    search.innerText = data[random].album.title;
  }
  for (let i = 1; i <= 6; i++) {
    const elem = document.getElementById(`album-mobile-${i}`);
    let random = Math.floor(Math.random() * 25);
    while (used.includes(data[random].album.id)) {
      random = Math.floor(Math.random() * 25);
    }
    used.push(data[random].album.id);
    const img = elem.querySelector("div img");
    img.setAttribute("src", data[random].album.cover);
    const search = elem.querySelector("p");
    search.innerText = reduceText(data[random].album.title, 13);
  }
  console.log(used);
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
      console.log(data);
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

  data.forEach((d, i) => {
    if (i == 0 || i == 1) {
      const elem = document.getElementById(`big-album-${i}`);
      const img = elem.querySelector("img");
      img.setAttribute("src", d.album.cover);
      const title = elem.querySelector("h6");
      title.innerText = d.album.title;
    }
    const newCol = document.createElement("div");
    newCol.classList.add("col", "out-banner");
    newCol.innerHTML = `
    <div class="card big-banner">
                  <div>
                    <img src="${d.album.cover_xl}" alt="" class="w-100" />
                  </div>
                  <div>
                    <h6 class="mt-3">${d.album.title}</h6>
                    <p></p>
                  </div>
                </div>
    `;
    mainAlbums.appendChild(newCol);
  });
}
