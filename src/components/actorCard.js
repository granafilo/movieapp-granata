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

export const createActorStandardCard = (attore) => {
  let cardContainer = document.createElement("div");
  cardContainer.className = "card w-40 h-80 shadow-sm shrink-0 flex flex-col group";

  let figureElement = document.createElement("figure");
  figureElement.className = " w-full flex-3";

  let imageElement = document.createElement("img");
  if (attore.profile_path === null) {
    // female
    if (attore.gender == 1) {
      imageElement.src = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg";
      imageElement.className = "h-full w-full !object-fill !object-center group-hover:scale-105 transition-all duration-300 cursor-pointer"

    } else {
      // male
      imageElement.src = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg";
      imageElement.className = "h-full w-full !object-fill !object-center group-hover:scale-105 transition-all duration-300 cursor-pointer"

    }
  } else {
    imageElement.src = `https://image.tmdb.org/t/p/original/${attore.profile_path}`;
    imageElement.className = "h-full w-full object-cover group-hover:scale-105 transition-all duration-300 cursor-pointer"
  }
  imageElement.alt = `${attore.nome}`;

  figureElement.appendChild(imageElement);

  let cardBody = document.createElement("div");
  cardBody.className = "card-body h-4/12 p-2 flex-1";

  let cardTitle = document.createElement("h2");
  cardTitle.className = "card-title text-textPrimary";
  cardTitle.innerText = `${attore.nome}`;

  let cardRole = document.createElement("p");
  cardRole.innerText = `${attore.personaggio}`;
  cardRole.className = "text-textSecondary"

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardRole);

  cardContainer.appendChild(figureElement);
  cardContainer.appendChild(cardBody);

  return cardContainer;
};