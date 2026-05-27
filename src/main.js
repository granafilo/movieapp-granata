import movies from "./movies.json"

const ordinaPopular = (movies) => {
  let film = [...movies];
  return film.sort((a, b) => b.popularity - a.popularity);
};


let filmOrdinatiPopolarità = ordinaPopular(movies);

const loadHero = (movies) => {
  const heroTitle = document.getElementById("heroTitle");
  const heroOverview = document.getElementById("heroOverview");
  const heroWrapper = document.getElementById("heroWrapper");

  heroTitle.innerText = movies[0].title;
  heroOverview.innerText = movies[0].overview;
  heroWrapper.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movies[0].backdrop_path})`;
};

const loadCard = (title, overview, image) => {
  let cardHTML = ` 
    <div class="card bg-base-100 min-w-84 max-h-160 shadow-sm border border-grey">
      <figure>
        <img src="https://image.tmdb.org/t/p/original/${image}" alt="Shoes" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">
          ${title}
        </h2>
        <p>${overview}</p>
        <div class="card-actions justify-end">
          <button class="btn btn-error font-bold">Guarda ora!</button>
          <button class="btn btn-ghost font-normal">Altre info!</button>
        </div>
      </div>
    </div>`;

  return cardHTML;
};

const filmaDaGuardare = (movies) => {
  let cardWrapper = document.getElementById("watchNext");
  for (let i = 0; i < 15; i++) {
    cardWrapper.innerHTML += loadCard(movies[i].title, movies[i].overview, movies[i].backdrop_path);
  }
};

const loadWatchNext = () => {
  filmaDaGuardare(movies);
  const watchNext = document.getElementById('watchNext');

  watchNext.addEventListener('wheel', (event) => {
    event.preventDefault();
    watchNext.scrollLeft += event.deltaY;
  });
};

loadHero(filmOrdinatiPopolarità);
loadWatchNext();