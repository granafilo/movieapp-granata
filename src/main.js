import { getResultFromFetch, getOptions, wait } from "./utils/utils.js"
import card from "daisyui/components/card";
import { getActorCard } from "./components/actorCard.js"
import {getFilmCard} from "./components/filmCard.js"


const loadHero = (movies) => {
  const heroTitle = document.getElementById("heroTitle");
  const heroOverview = document.getElementById("heroOverview");
  const heroWrapper = document.getElementById("heroWrapper");

  heroTitle.innerText = movies[0].title;
  heroOverview.innerText = movies[0].overview;
  heroWrapper.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movies[0].backdrop_path})`;
};

const filmaDaGuardare = (movies) => {
  let cardWrapper = document.getElementById("watchNext");
  for (let i = 0; i < 15; i++) {
    cardWrapper.appendChild(getFilmCard(movies[i].title, movies[i].overview, movies[i].backdrop_path, movies[i].vote_average, movies[i].release_date, movies[i].id) );
  }
};

const popularActor = (actor) => {
  let cardWrapper = document.getElementById("popularActor");
  for (let i = 0; i < 15; i++) {
    console.log(actor[i]);
    
    cardWrapper.appendChild(getActorCard(actor[i].name, actor[i].profile_path, actor[i].gender));
  }
};

const loadHomePage = (movies, actor) => {
  
  loadHero(movies);
  filmaDaGuardare(movies);
  popularActor(actor)

  // const watchNext = document.getElementById('watchNext');
  // const popularActorDiv = document.getElementById('popularActor');
  // watchNext.addEventListener('wheel', (event) => {
  //   event.preventDefault();
  //   watchNext.scrollLeft += event.deltaY;
  // });

  // popularActorDiv.addEventListener('wheel', (event) => {
  //   event.preventDefault();
  //   popularActorDiv.scrollLeft += event.deltaY;
  // });
};

const loadPage = async () => {
  let movies = await getResultFromFetch("https://api.themoviedb.org/3/movie/popular?language=it-IT&page=1&region=eu", getOptions);
  let actor = await getResultFromFetch("https://api.themoviedb.org/3/person/popular?language=it-IT&page=1", getOptions)

  loadHomePage(movies, actor);
};

const watchNext = document.getElementById('watchNext');
watchNext.addEventListener("click", (event) => {
  const targetElement = event.target.closest(".more-info-btn");
  if (targetElement) {
    const filmID = targetElement.dataset.idFilm;
    window.location.href= `details.html?id=${filmID}`;
  }
  
});


// ----------------------------------------------------------------------------------------

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