import { createMovieBackdropCard, createMovieMinimalCard } from "../components/filmCard";
import { getResultFromFetch, getOptions } from "../utils/utils";
import { wait } from "../utils/utils";
import { getViewMoreCard } from "../components/viewMoreCard";

const popolaPopularMovies = (movies, idWrapper) => {
  let cardWrapper = document.getElementById(idWrapper);
  for (let i = 0; i < 15; i++) {
    cardWrapper.appendChild(createMovieBackdropCard(movies[i].title, movies[i].overview, movies[i].backdrop_path, movies[i].vote_average, movies[i].release_date, movies[i].id) );
  }
  
};

const popolaTopRatedMovies = (movies, idWrapper) => {
  let cardWrapper = document.getElementById(idWrapper);
  for (let i = 0; i < 15; i++) {
    cardWrapper.appendChild(createMovieMinimalCard(movies[i].title, movies[i].release_date, movies[i].poster_path));
  }
};


const loadHomePage = (movies, actor) => {
  popolaPopularMovies(movies, "popularMovies");
  popolaTopRatedMovies(actor, "topRatedMovies")
};

const loadPage = async () => {
  let moviesPopular = await getResultFromFetch("https://api.themoviedb.org/3/movie/popular?language=it-IT&page=1&region=eu", getOptions);
  let actor = await getResultFromFetch('https://api.themoviedb.org/3/movie/top_rated?language=it-IT&page=1&region=eu', getOptions)

  console.log(actor);
  

  loadHomePage(moviesPopular, actor);
};

const watchNext = document.getElementById('popularMovies');
watchNext.addEventListener("click", (event) => {
  const targetElement = event.target.closest(".more-info-btn");
  if (targetElement) {
    const filmID = targetElement.dataset.idFilm;
    window.location.href= `details.html?id=${filmID}`;
  }
});

const topRatedMovies = document.getElementById('topRatedMovies');
topRatedMovies.addEventListener("click", (event) => {
  const targetElement = event.target.closest(".more-info-btn");
  if (targetElement) {
    const filmID = targetElement.dataset.idFilm;
    window.location.href= `details.html?id=${filmID}`;
  }
});

let tentativi = 0;
let delayStandard = 1000;
let success = false;

while (!success && tentativi < 5) {
  try {
    await loadPage();
    success = true;
  } catch (error) {
    tentativi++;
    console.log("Tentativi rimasti: ", (5 - tentativi))
    console.log(error);
    await wait(delayStandard * tentativi);
  }
}