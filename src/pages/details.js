import { getJsonFromFetch, getOptions, getResultFromFetch, wait } from "../utils/utils.js"
import { createActorStandardCard } from "../components/actorCard.js";
import { getViewMoreCard } from "../components/viewMoreCard.js"
import { normalizzaAttore } from "../utils/normalizzaAttore.js";

const urlParams = new URLSearchParams(window.location.search);

const id = urlParams.get("id");
const contentType = urlParams.get("tipo");

const loadHero = (details) => {
    const tipo = contentType == "film";
    const heroTitle = document.getElementById("heroTitle");

    const heroBackground = document.getElementById("heroOverlay");
    const heroPosterWrapper = document.getElementById("posterWrapper")
    const heroOverview = document.getElementById("heroOverview");
    const movieInfo = document.getElementById("movieInfo");
    const valutazione = document.getElementById("valutazione");
    const valutazioneValue = document.getElementById("valutazioneValue");

    const heroPoster = document.createElement("img");
    heroPoster.src = `https://image.tmdb.org/t/p/original${details.poster_path}`;
    heroPoster.className = "rounded-2xl h-full";

    heroPosterWrapper.appendChild(heroPoster);

    heroTitle.innerText = tipo ? details.title : details.name;

    const data = new Date(tipo ? details.release_date : details.first_air_date);

    const annoUscita = document.createElement("span");
    annoUscita.innerText = " (" + data.getFullYear() + ") ";
    document.title += " - " + data.getFullYear()
    annoUscita.className = "!text-grey-100 font-normal"

    heroTitle.appendChild(annoUscita);


    const annoUscitaCompleto = document.createElement("div");
    annoUscitaCompleto.innerText = data.toLocaleDateString('it-IT', { day: '2-digit' }) + "/" + data.toLocaleDateString('it-IT', { month: '2-digit' }) + "/" + data.toLocaleDateString('it-IT', { year: 'numeric' });
    annoUscitaCompleto.className = "flex items-center gap-2 after:content-['•'] last:after:hidden";

    movieInfo.appendChild(annoUscitaCompleto)

    const genere = document.createElement("div");
    const stringaGeneri = details.genres.map(genere => genere.name).join(", ")
    genere.innerText = stringaGeneri;
    genere.className = "flex items-center gap-2 after:content-['•'] last:after:hidden"

    movieInfo.appendChild(genere);

    if (tipo) {
        const durata = document.createElement("div");
        durata.innerText = Math.floor(details.runtime / 60) + "h " + details.runtime % 60 + "m"
        durata.className = "flex items-center gap-2 after:content-['•'] last:after:hidden";
        movieInfo.appendChild(durata);
    }
    const voto = details.vote_average.toFixed(1) * 10;

    valutazione.style.setProperty("--value", voto);
    valutazioneValue.innerText = voto + "%";
    valutazione.setAttribute("aria-valuenow", voto);

    heroOverview.innerText = details.overview;
};

const popolaAttori = (cast) => {
    let cardWrapper = document.getElementById("popularActor");
    cast.slice(0, 15).forEach(attore => {
        cardWrapper.appendChild(createActorStandardCard(normalizzaAttore(attore)));
    });
    if (cast.slice(0,15).length < cast.length) {
        cardWrapper.appendChild(getViewMoreCard());
    }
};

const loadPage = async () => {
    let objectDetails = {};
    let credits = [];
    if (contentType == "film") {
        objectDetails = await getJsonFromFetch(`https://api.themoviedb.org/3/movie/${id}?language=it-IT`, getOptions);
        credits = await getJsonFromFetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, getOptions);
        document.title = objectDetails.title ;
    } else if (contentType == "serie") {
        objectDetails = await getJsonFromFetch(`https://api.themoviedb.org/3/tv/${id}?language=it-IT`, getOptions);
        credits = await getJsonFromFetch(`https://api.themoviedb.org/3/tv/${id}/aggregate_credits?language=en-US`, getOptions);
        document.title = objectDetails.name ;
        
        credits = credits;
    }

    loadHero(objectDetails);
    popolaAttori(credits.cast);

};

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