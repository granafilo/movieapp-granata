import { createMovieBackdropCard, createMovieMinimalCard } from "../components/filmCard";
import { getResultFromFetch, getOptions } from "../utils/utils";
import { wait } from "../utils/utils";
import { getViewMoreCard } from "../components/viewMoreCard";
import { normalizzaMedia } from "../utils/normalizzaMedia";

const popolaPopularMovies = (movies, idWrapper) => {
  let cardWrapper = document.getElementById(idWrapper);

  movies.slice(0, 15).forEach(film => {
    cardWrapper.appendChild(createMovieBackdropCard(normalizzaMedia(film)));
  });

  if (movies.slice(0, 15).length < movies.length) {
    cardWrapper.appendChild(getViewMoreCard(130));
  }
};

const popolaTopRatedMovies = (movies, idWrapper) => {
  let cardWrapper = document.getElementById(idWrapper);

  movies.slice(0, 15).forEach(film => {
    cardWrapper.appendChild(createMovieMinimalCard(normalizzaMedia(film)));
  });

  if (movies.slice(0, 15).length < movies.length) {
    cardWrapper.appendChild(getViewMoreCard("auto"));
  }
};


const loadHomePage = (movies, topRated) => {
  popolaPopularMovies(movies, "popularMovies");
  popolaTopRatedMovies(topRated, "topRatedMovies")
};

const loadPage = async () => {
  let moviesPopular = await getResultFromFetch("https://api.themoviedb.org/3/movie/popular?language=it-IT&page=1&region=eu", getOptions);
  let topRated = await getResultFromFetch('https://api.themoviedb.org/3/movie/top_rated?language=it-IT&page=1&region=eu', getOptions)

  loadHomePage(moviesPopular, topRated);
};

const watchNext = document.getElementById('popularMovies');
watchNext.addEventListener("click", (event) => {
  const targetElement = event.target.closest(".more-info-btn");
  if (targetElement) {
    const filmID = targetElement.dataset.idFilm;
    window.location.href = `details.html?id=${filmID}&tipo=film`;
  }
});

const topRatedMovies = document.getElementById('topRatedMovies');
topRatedMovies.addEventListener("click", (event) => {
  const targetElement = event.target.closest(".more-info");
  console.log(targetElement);

  if (targetElement) {
    const filmID = targetElement.dataset.idFilm;
    window.location.href = `details.html?id=${filmID}&tipo=film`;
  }
});

let tentativi = 0;
let delayStandard = 1000;
let success = false;

while (!success && tentativi < 5) {
  try {
    const loading = document.getElementById('loading');
    loading.classList.remove('opacity-0');
    await loadPage();
    loading.classList.add("opacity-0");

    success = true;
  } catch (error) {
    tentativi++;
    console.log("Tentativi rimasti: ", (5 - tentativi))
    console.log(error);
    await wait(delayStandard * tentativi);
  }
}