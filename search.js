const search = document.getElementById("searchBtn");
const searchSongs = () => {
  const searchWrap = document.getElementById("search");
  const searchValue = searchWrap.value;
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchValue}`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore getting the datas");
      }
    })
    .then((detail) => {
      console.log(detail);
      const myRow = document.getElementById("myRow");
      myRow.classList.add("d-flex", "flex-row");
      myRow.innerText = ``;
      for (let i = 0; i < detail.data.length; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("col-4");

        newDiv.innerHTML = `
              <div class="card h-100 p-0  text-white border-0" id="cardColor"   >
              <img src="${detail.data[i].album.cover_medium}" class="card-img-top ps-2 pt-2 pe-2 img" alt="${detail.data[i].album.title}">
              <div class="card-body d-flex flex-column justify-content-center text-center">
              <a href="artistPage/artist.html?artist=${detail.data[i].id}" class="link-underline link-underline-opacity-0 card-title">${detail.data[i].artist.name}</a>
              <a href="albumPage.html?album=${detail.data[i].id}" class="link-underline link-underline-opacity-0 card-title">${detail.data[i].album.title}</a>
             
              </div>
              </div>
        </div>
     `;
        myRow.appendChild(newDiv);
      }
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};
search.addEventListener("click", searchSongs);

const searchBar = function () {
  searchBar = document.getElementById("searchBar");
  searchBar.addEventListener("click");
};
