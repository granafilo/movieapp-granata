import { getJsonFromFetch, getOptions, getResultFromFetch, wait } from "../utils/utils.js"
import { createActorStandardCard } from "../components/actorCard.js";
import { getViewMoreCard } from "../components/viewMoreCard.js"

const urlParams = new URLSearchParams(window.location.search);

const id = urlParams.get("id");

const popolaAttori = (cast) => {
    let cardWrapper = document.getElementById("popularActor");
    for (let i = 0; i < 10; i++) {
        cardWrapper.appendChild(createActorStandardCard(cast[i].name, cast[i].character, cast[i].profile_path, cast[i].gender));
    }

    const lastCard = getViewMoreCard();
    cardWrapper.appendChild(lastCard)
};


const loadHero = (filmDetails) => {
    const heroTitle = document.getElementById("heroTitle");
    // const heroOverview = document.getElementById("heroOverview");
    const heroBackground = document.getElementById("heroOverlay");
    const heroPosterWrapper = document.getElementById("posterWrapper")
    const heroOverview = document.getElementById("heroOverview");
    const movieInfo = document.getElementById("movieInfo");

    const heroPoster = document.createElement("img");
    heroPoster.src = `https://image.tmdb.org/t/p/original${filmDetails.poster_path}`;
    heroPoster.className = "rounded-2xl h-full";

    heroPosterWrapper.appendChild(heroPoster);

    // Hero title
    heroTitle.innerText = filmDetails.title;

    const data = new Date(filmDetails.release_date);

    const annoUscita = document.createElement("span");
    annoUscita.innerText = " (" + data.getFullYear() + ") ";
    annoUscita.className = "!text-grey-100 font-normal"

    heroTitle.appendChild(annoUscita);


    const annoUscitaCompleto = document.createElement("div");
    annoUscitaCompleto.innerText = data.toLocaleDateString('it-IT', { day: '2-digit' }) + "/" + data.toLocaleDateString('it-IT', { month: '2-digit' }) + "/" + data.toLocaleDateString('it-IT', { year: 'numeric' });
    annoUscitaCompleto.className = "flex items-center gap-2 after:content-['•'] last:after:hidden";

    movieInfo.appendChild(annoUscitaCompleto)

    const genere = document.createElement("div");
    const stringaGeneri = filmDetails.genres.map(genere => genere.name).join(", ")
    genere.innerText = stringaGeneri;
    genere.className = "flex items-center gap-2 after:content-['•'] last:after:hidden"

    movieInfo.appendChild(genere);

    const durata = document.createElement("div");
    durata.innerText = Math.floor(filmDetails.runtime / 60) + "h " + filmDetails.runtime % 60 + "m"
    durata.className = "flex items-center gap-2 after:content-['•'] last:after:hidden";

    movieInfo.appendChild(durata);

    updateRatingCircle(filmDetails.vote_average);


    //Hero overview
    heroOverview.innerText = filmDetails.overview;

    // heroBackground.style.backgroundImage = backdropStyle(filmDetails.backdrop_path);
};

const loadPage = async () => {
    const objectDetails = await getJsonFromFetch(`https://api.themoviedb.org/3/movie/${id}?language=it-IT`, getOptions);
    const credits = await getJsonFromFetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, getOptions);

    document.title = objectDetails.title;

    loadHero(objectDetails);
    popolaAttori(credits.cast);

};

function updateRatingCircle(voteAverage) {
    // Se TMDB ti dà ad esempio 7.9, lo moltiplichiamo per 10 per avere 79%
    const percentage = Math.floor(voteAverage * 10);

    const cerchioProgress = document.getElementById('movie-progress');
    const voto = document.getElementById('movie-rating-text');

    const radius = cerchioProgress.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    cerchioProgress.style.strokeDasharray = `${circumference} ${circumference}`;
    const offset = circumference - (percentage / 100) * circumference;

    cerchioProgress.style.strokeDashoffset = offset;
    voto.innerText = percentage;
}

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

