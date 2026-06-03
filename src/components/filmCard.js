export const createMovieBackdropCard = (title, overview, image, avgVote, data, id) => {

  let cardContainer = document.createElement("div");
  cardContainer.className = "card bg-white w-84 h-130 shadow-sm border border-grey flex flex-col shrink-0 ";

  let figureElement = document.createElement("figure");
  figureElement.className = "h-[40%] w-full overflow-hidden";

  let imageElement = document.createElement("img");
  imageElement.className = "w-full h-full object-cover hover:scale-110 duration-300";
  imageElement.src = `https://image.tmdb.org/t/p/original/${image}`;
  imageElement.alt = `${title}`

  figureElement.appendChild(imageElement);

  let cardBody = document.createElement("div");
  cardBody.className = "card-body h-[60%] flex flex-col justify-between p-4";

  let cardTitle = document.createElement("h2");
  cardTitle.innerText = `${title}`;
  cardTitle.className = "card-title text-lg font-bold text-textPrimary shrink-0 mb-2";

  let filmInfoContainer = document.createElement("div");
  filmInfoContainer.className = "flex text-textPrimary justify-between";

  let dataUscitaBadge = document.createElement("div");
  dataUscitaBadge.className = "badge badge-neutral text-textSecondary badge-outline";
  dataUscitaBadge.innerText = `${data}`;

  let rankFilm = document.createElement("div");

  rankFilm.className = `badge ${colorBadge(avgVote.toFixed(1))}`;
  rankFilm.innerText = `${avgVote.toFixed(1)}`;

  filmInfoContainer.appendChild(dataUscitaBadge);
  filmInfoContainer.appendChild(rankFilm);

  let overviewWrapper = document.createElement("div");
  overviewWrapper.className = "flex-1 min-h-0 overflow-hidden mb-4";
  let overviewText = document.createElement("p");
  overviewText.className = "text-sm text-textSecondary overflow-hidden line-clamp-5";
  overviewText.innerText = `${overview}`;

  overviewWrapper.appendChild(overviewText);

  let cardActionWrapper = document.createElement("div");
  cardActionWrapper.className = "card-actions justify-end shrink-0 mt-auto";

  let watchBtn = document.createElement("button");
  watchBtn.className = "btn bg-red-900 border-0 text-white hover:bg-red-950 btn-sm";
  watchBtn.innerText = "Guarda Ora!"

  let moreInfoBtn = document.createElement("button");
  moreInfoBtn.className = "btn btn-ghost btn-sm font-semibold text-textSecondary shadow-lg more-info-btn";
  moreInfoBtn.innerText = "More Info!"
  moreInfoBtn.dataset.idFilm = `${id}`;

  cardActionWrapper.appendChild(watchBtn);
  cardActionWrapper.appendChild(moreInfoBtn);

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(filmInfoContainer);
  cardBody.appendChild(overviewWrapper);
  cardBody.appendChild(cardActionWrapper);

  cardContainer.appendChild(figureElement);
  cardContainer.appendChild(cardBody);

  return cardContainer;
};

const colorBadge = (voto) => {
  if (voto < 6) {
    return "badge-error";
  } else if (voto < 7.5) {
    return "bg-[#87bfec]";
  } else if (voto < 9.5) {
    return "badge-success";
  } else {
    return "bg-[#FFD700] font-bold text-textPrimary border-0 shadow-glow"
  }
};

export const createMovieMinimalCard = (title, data, image) => {

  const dataUscita1 = new Date(data);

  const opzioni = { day: 'numeric', month: 'long', year: 'numeric' };
  const dataFormattata = dataUscita1.toLocaleDateString('it-IT', opzioni).replace(/ (\d{4})/, ', $1');


  let cardContainer = document.createElement("div");
  cardContainer.className = "card w-40 h-auto shrink-0 group cursor-pointer transition-all duration-300"

  let figureElement = document.createElement("figure");
  figureElement.className = "w-full overflow-hidden rounded-lg";

  let imageElement = document.createElement("img");
  imageElement.className = "w-full h-full object-cover hover:scale-110 duration-300";
  imageElement.src = `https://media.themoviedb.org/t/p/w220_and_h330_face${image}`;
  imageElement.alt = `${title}`

  figureElement.appendChild(imageElement);


  let cardBody = document.createElement("div");
  cardBody.className = "card-body p-[10px_0_0_0]";

  let cardTitle = document.createElement("h2");
  cardTitle.innerText = `${title}`;
  cardTitle.title = `${title}`
  cardTitle.className = "font-bold text-textPrimary text-lg line-clamp-3 group-hover:underline ";

  let dataUscita = document.createElement("div");
  dataUscita.className = "text-textSecondary";
  dataUscita.innerText = `${dataFormattata}`;

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(dataUscita);

  cardContainer.appendChild(figureElement);
  cardContainer.appendChild(cardBody);

  return cardContainer
};