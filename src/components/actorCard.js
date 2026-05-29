

export const getActorCard = (name, image) => {
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

