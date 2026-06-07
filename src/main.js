import { getResultFromFetch, getOptions, wait } from "./utils/utils.js"
import card from "daisyui/components/card";
import { createActorOverlayCard } from "./components/actorCard.js"
import {createMovieBackdropCard} from "./components/filmCard.js"
import { loadHeroHomepage } from "./components/hero.js";



const filmaDaGuardare = (movies) => {
  let cardWrapper = document.getElementById("watchNext");
  for (let i = 0; i < 15; i++) {
    cardWrapper.appendChild(createMovieBackdropCard(movies[i].title, movies[i].overview, movies[i].backdrop_path, movies[i].vote_average, movies[i].release_date, movies[i].id) );
  }
};

const popularActor = (actor) => {
  let cardWrapper = document.getElementById("popularActor");
  for (let i = 0; i < 15; i++) {    
    cardWrapper.appendChild(createActorOverlayCard(actor[i].name, actor[i].profile_path, actor[i].gender));
  }
};

const loadHomePage = async (movies, actor) => {
  
  await loadHeroHomepage(movies);
  filmaDaGuardare(movies);
  popularActor(actor)
};

const loadPage = async () => {
  let movies = await getResultFromFetch("https://api.themoviedb.org/3/movie/popular?language=it-IT&page=1&region=eu", getOptions);
  let actor = await getResultFromFetch("https://api.themoviedb.org/3/person/popular?language=it-IT&page=1", getOptions)

  await loadHomePage(movies, actor);
};

const watchNext = document.getElementById('watchNext');
watchNext.addEventListener("click", (event) => {
  const targetElement = event.target.closest(".more-info-btn");
  if (targetElement) {
    const filmID = targetElement.dataset.idFilm;
    window.location.href= `details.html?id=${filmID}&tipo=film`;
  }
});


// ----------------------------------------------------------------------------------------

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