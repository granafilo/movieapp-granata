export const createActorOverlayCard = (name, image, gender) => {
  // Contenitore principale della card
  let cardContainer = document.createElement("div");
  cardContainer.className = "card bg-white image-full w-84 h-130 shadow-sm shrink-0 ";

  // Elemento Figure per l'immagine di sfondo
  let figureElement = document.createElement("figure");

  let imageElement = document.createElement("img");

  if (image === null) {
    // female
    if (gender == 1) {
      imageElement.src = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg";
      imageElement.className = "!object-fill !object-center"

    } else {
      // male
      imageElement.src = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg";
      imageElement.className = "!object-fill !object-center"

    }
  } else {
    imageElement.src = `https://image.tmdb.org/t/p/original/${image}`;
  }
  imageElement.alt = `${name}`;

  figureElement.appendChild(imageElement);

  // Corpo della card (sovrapposto all'immagine grazie a 'image-full' di DaisyUI)
  let cardBody = document.createElement("div");
  cardBody.className = "card-body flex flex-col justify-between";

  // Nome dell'attore
  let cardTitle = document.createElement("h2");
  cardTitle.className = "card-title text-textPrimary";
  cardTitle.innerText = `${name}`;

  // Bottone per maggiori informazioni
  let moreInfoBtn = document.createElement("button");
  moreInfoBtn.className = "btn btn-primary rounded-full";
  moreInfoBtn.innerText = "More info!";

  // Appendiamo gli elementi al cardBody
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(moreInfoBtn);

  // Appendiamo figure e cardBody al contenitore principale
  cardContainer.appendChild(figureElement);
  cardContainer.appendChild(cardBody);

  return cardContainer;
};

export const createActorStandardCard = (name, role, image) => {
  // Contenitore principale della card
  let cardContainer = document.createElement("div");
  cardContainer.className = "card w-40 h-80 shadow-sm shrink-0 flex flex-col group";

  // Elemento Figure per l'immagine di sfondo
  let figureElement = document.createElement("figure");
  figureElement.className = " w-full";

  let imageElement = document.createElement("img");
  imageElement.src = `https://image.tmdb.org/t/p/original/${image}`;
  imageElement.alt = `${name}`;
  imageElement.className = "h-full w-full object-cover group-hover:scale-105 transition-all duration-300 cursor-pointer"

  figureElement.appendChild(imageElement);

  // Corpo della card (sovrapposto all'immagine grazie a 'image-full' di DaisyUI)
  let cardBody = document.createElement("div");
  cardBody.className = "card-body h-4/12 p-2";

  // Nome dell'attore
  let cardTitle = document.createElement("h2");
  cardTitle.className = "card-title text-textPrimary";
  cardTitle.innerText = `${name}`;

  // Bottone per maggiori informazioni
  let cardRole = document.createElement("p");
  cardRole.innerText = `${role}`;
  cardRole.className = "text-textSecondary"

  // Appendiamo gli elementi al cardBody
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardRole);

  // Appendiamo figure e cardBody al contenitore principale
  cardContainer.appendChild(figureElement);
  cardContainer.appendChild(cardBody);

  return cardContainer;
};