import { fetchPopular, getOptions, wait } from "./utils"
import card from "daisyui/components/card";

const loadHero = (movies) => {
  const heroTitle = document.getElementById("heroTitle");
  const heroOverview = document.getElementById("heroOverview");
  const heroWrapper = document.getElementById("heroWrapper");

  heroTitle.innerText = movies[0].title;
  heroOverview.innerText = movies[0].overview;
  heroWrapper.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movies[0].backdrop_path})`;
};

const colorBadge = (voto) => {
  if (voto < 6) {
    return "badge-error";
  } else if (voto < 7.5) {
    return "badge-primary";
  }else if (voto < 9.5){
    return "badge-success";
  }else{
    return "bg-[#FFD700] font-bold text-black border-0 shadow-glow"
  }
};

const filmCard = (title, overview, image, avgVote, data) => {

  let cardContainer = document.createElement("div");
  cardContainer.className = "card bg-base-100 min-w-84 h-130 shadow-sm border border-grey flex flex-col  ";

  let figureElement = document.createElement("figure");
  figureElement.className = "h-[40%] w-full overflow-hidden";

  let imageElement = document.createElement("img");
  imageElement.className = "w-full h-full object-cover hover:scale-125 duration-300";
  imageElement.src = `https://image.tmdb.org/t/p/original/${image}`;
  imageElement.alt = `${title}`

  figureElement.appendChild(imageElement);

  let cardBody = document.createElement("div");
  cardBody.className = "card-body h-[60%] flex flex-col justify-between p-4";
  
  let cardTitle = document.createElement("h2");
  cardTitle.innerText = `${title}`;
  cardTitle.className = "card-title text-lg font-bold shrink-0 mb-2";

  let filmInfoContainer = document.createElement("div");
  filmInfoContainer.className = "flex justify-between";

  let dataUscitaBadge = document.createElement("div");
  dataUscitaBadge.className = "badge badge-neutral badge-outline text-white";
  dataUscitaBadge.innerText = `${data}`;

  let rankFilm = document.createElement("div");

  rankFilm.className = `badge ${colorBadge(avgVote.toFixed(1))}`;
  rankFilm.innerText = `${avgVote.toFixed(1)}`;

  filmInfoContainer.appendChild(dataUscitaBadge);
  filmInfoContainer.appendChild(rankFilm);

  let overviewWrapper = document.createElement("div");
  overviewWrapper.className = "flex-1 min-h-0 overflow-hidden mb-4";
  let overviewText = document.createElement("p");
  overviewText.className = "text-sm text-gray-300 overflow-hidden line-clamp-5";
  overviewText.innerText = `${overview}`;

  overviewWrapper.appendChild(overviewText);

  let cardActionWrapper = document.createElement("div");
  cardActionWrapper.className = "card-actions justify-end shrink-0 mt-auto";

  let watchBtn = document.createElement("button");
  watchBtn.className = "btn bg-red-900 border-0 hover:bg-red-950 font-bold btn-sm";
  watchBtn.innerText = "Guarda Ora!"

  let moreInfoBtn = document.createElement("button");
  moreInfoBtn.className = "btn btn-ghost font-normal btn-sm";
  moreInfoBtn.innerText = "More Info!"

  cardActionWrapper.appendChild(watchBtn);
  cardActionWrapper.appendChild(moreInfoBtn);

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(filmInfoContainer);
  cardBody.appendChild(overviewWrapper);
  cardBody.appendChild(cardActionWrapper);

  cardContainer.appendChild(figureElement);
  cardContainer.appendChild(cardBody);

//   let cardHTML = `
// // <div class="card bg-base-100 min-w-84 h-130 shadow-sm border border-grey flex flex-col">

//   // <figure class="h-[40%] w-full overflow-hidden">
//     // <img src="" class="" alt="${title}" />
//   // </figure>

//   <div class="card-body h-[60%] flex flex-col justify-between p-4">
//     // <h2 class="card-title text-lg font-bold shrink-0 mb-2">${title}</h2>
//     // <div class="flex justify-between">
//     //   <div class="badge badge-neutral badge-outline text-white">${data}</div>
//     //   <div class="badge ${colorBadge(avgVote.toFixed(1))}">${avgVote.toFixed(1)}</div>
//     // </div>


  
//     // <div class="flex-1 min-h-0 overflow-hidden mb-4">
//     //   <p class="text-sm text-gray-300 overflow-hidden line-clamp-5">
//     //     ${overview}
//     //   </p>
//     // </div>

//     <div class="card-actions justify-end shrink-0 mt-auto">
//       <button class="btn btn-error font-bold btn-sm">Guarda ora!</button>
//       <button class="btn btn-ghost font-normal btn-sm">More Info!</button>
//     </div>
//   </div>
// </div>`;

  return cardContainer;
};

const filmaDaGuardare = (movies) => {
  let cardWrapper = document.getElementById("watchNext");
  for (let i = 0; i < 15; i++) {
    cardWrapper.appendChild(filmCard(movies[i].title, movies[i].overview, movies[i].backdrop_path, movies[i].vote_average, movies[i].release_date));
  }
};

const popularActor = (actor) => {
  let cardWrapper = document.getElementById("popularActor");
  for (let i = 0; i < 15; i++) {
    cardWrapper.appendChild(popularActorCard(actor[i].name, actor[i].profile_path));
  }
};

const popularActorCard = (name, image) => {
  // Contenitore principale della card
  let cardContainer = document.createElement("div");
  cardContainer.className = "card bg-base-100 image-full min-w-84 h-130 shadow-sm";

  // Elemento Figure per l'immagine di sfondo
  let figureElement = document.createElement("figure");

  let imageElement = document.createElement("img");
  imageElement.src = `https://image.tmdb.org/t/p/original/${image}`;
  imageElement.alt = `${name}`;

  figureElement.appendChild(imageElement);

  // Corpo della card (sovrapposto all'immagine grazie a 'image-full' di DaisyUI)
  let cardBody = document.createElement("div");
  cardBody.className = "card-body flex flex-col justify-between";

  // Nome dell'attore
  let cardTitle = document.createElement("h2");
  cardTitle.className = "card-title";
  cardTitle.innerText = `${name}`;

  // Bottone per maggiori informazioni
  let moreInfoBtn = document.createElement("button");
  moreInfoBtn.className = "btn btn-primary";
  moreInfoBtn.innerText = "More info!";

  // Appendiamo gli elementi al cardBody
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(moreInfoBtn);

  // Appendiamo figure e cardBody al contenitore principale
  cardContainer.appendChild(figureElement);
  cardContainer.appendChild(cardBody);

  return cardContainer;
};

const loadHomePage = (movies,actor) => {
  filmaDaGuardare(movies);
  popularActor(actor)

  const watchNext = document.getElementById('watchNext');
  const popularActorDiv = document.getElementById('popularActor');
  watchNext.addEventListener('wheel', (event) => {
    event.preventDefault();
    watchNext.scrollLeft += event.deltaY;
  });

  popularActorDiv.addEventListener('wheel', (event) => {
    event.preventDefault();
    popularActorDiv.scrollLeft += event.deltaY;
  });
};



const loadPage = async () => {
  let movies = await fetchPopular("https://api.themoviedb.org/3/movie/popular?language=it-IT&page=1&region=eu", getOptions);
  let actor = await fetchPopular("https://api.themoviedb.org/3/person/popular?language=it-IT&page=1", getOptions)

  loadHero(movies);
  loadHomePage(movies, actor);
};

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