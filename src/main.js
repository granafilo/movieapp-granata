import { getResultFromFetch, getOptions, wait } from "./utils/utils.js"
import card from "daisyui/components/card";
import { createActorOverlayCard } from "./components/actorCard.js"
import { createMovieBackdropCard } from "./components/filmCard.js"
import { loadHeroHomepage } from "./components/hero.js";
import { normalizzaAttore } from "./utils/normalizzaAttore.js";
import { normalizzaMedia } from "./utils/normalizzaMedia.js";
import { getViewMoreCard } from "./components/viewMoreCard.js";



const filmaDaGuardare = (contents) => {
  let cardWrapper = document.getElementById("watchNext");
  contents.slice(0, 15).forEach(media => {
    cardWrapper.appendChild(createMovieBackdropCard(normalizzaMedia(media)));
  });
  if (contents.slice(0, 15).length < contents.length) {
    cardWrapper.appendChild(getViewMoreCard(130));
  }
};

const popularActor = (actor) => {
  let cardWrapper = document.getElementById("popularActor");
  actor.slice(0, 15).forEach(attore => {
    cardWrapper.appendChild(createActorOverlayCard(normalizzaAttore(attore)));

  });

  if (actor.slice(0, 15).length < actor.length) {
    cardWrapper.appendChild(getViewMoreCard(130));
  }
};

const loadHomePage = async (contents, actor) => {
  // console.log(contents[0]);
  // console.log(contents);
  
  await loadHeroHomepage(normalizzaMedia(contents[0]));
  filmaDaGuardare(contents);
  popularActor(actor)
};

const loadPage = async () => {
  let contents = await getResultFromFetch("https://api.themoviedb.org/3/trending/all/day?language=it-IT", getOptions);
  let actor = await getResultFromFetch("https://api.themoviedb.org/3/person/popular?language=it-IT&page=1", getOptions)

  await loadHomePage(contents, actor);
};

const watchNext = document.getElementById('watchNext');
watchNext.addEventListener("click", (event) => {
  const targetElement = event.target.closest(".more-info-btn");
  if (targetElement) {
    const filmID = targetElement.dataset.idFilm;
    window.location.href = `details.html?id=${filmID}&tipo=film`;
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