export const getFilmCard = (title, overview, image, avgVote, data, id) => {

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
  moreInfoBtn.className = "btn btn-ghost font-normal btn-sm more-info-btn";
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
    return "badge-primary";
  }else if (voto < 9.5){
    return "badge-success";
  }else{
    return "bg-[#FFD700] font-bold text-black border-0 shadow-glow"
  }
};