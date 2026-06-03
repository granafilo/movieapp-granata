export const getViewMoreCard = () => {
    const lastCard = document.createElement("div");
    lastCard.className = " card w-35 h-80 shrink-0 flex !flex-row p-2 items-center justify-center gap-2 shadow-lg";

    const title = document.createElement("h2");
    title.className = "font-bold text-lg hover:underline hover:cursor-pointer";
    title.innerText = "Visualizza Altro"

    const arrowGlyph = document.createElement("img");
    arrowGlyph.src = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-830-arrow-thin-right-5c2f4e65afc985448cd9042f9d64426f1e002fbd3c2546053d190fa27f77600f.svg";
    arrowGlyph.className = "flex-1 w-6 h-6 ";

    lastCard.appendChild(title);
    lastCard.appendChild(arrowGlyph);

    return lastCard;
};