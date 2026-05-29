import { getJsonFromFetch, getOptions, getResultFromFetch, wait } from "../utils/utils.js"
import { backdropStyle } from "../style/backdropStyle.js";
import { getReleaseDate } from "../utils/utils.js";

const urlParams = new URLSearchParams(window.location.search);

const id = urlParams.get("id");
const data = await getReleaseDate(id);


const loadHero = (filmDetails) => {
    const heroTitle = document.getElementById("heroTitle");
    // const heroOverview = document.getElementById("heroOverview");
    const heroBackground = document.getElementById("heroOverlay");
    const heroPosterWrapper = document.getElementById("posterWrapper")

    let heroPoster = document.createElement("img");
    heroPoster.src = `https://image.tmdb.org/t/p/original${filmDetails.poster_path}`;
    heroPoster.className = "rounded-2xl h-full";

    heroPosterWrapper.appendChild(heroPoster);

    heroTitle.innerText = filmDetails.title;

    const annoUscita = document.createElement("span");
    annoUscita.innerText = " (" + data.getFullYear() + ") ";
    annoUscita.className = "!text-grey-100 font-normal"

    heroTitle.appendChild(annoUscita)

    heroBackground.style.backgroundImage = backdropStyle(filmDetails.backdrop_path);
};

const loadPage = async (params) => {
    const objectDetails = await getJsonFromFetch(`https://api.themoviedb.org/3/movie/${id}?language=it-IT`, getOptions);

    await loadHero(objectDetails);
};

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

