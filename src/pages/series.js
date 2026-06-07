// fetch('https://api.themoviedb.org/3/tv/popular?language=it-IT&page=1', options)

import { createMovieMinimalCard } from "../components/filmCard";
import { getJsonFromFetch, getResultFromFetch } from "../utils/utils";
import { wait } from "../utils/utils";
import { getOptions } from "../utils/utils";

const popolaPopularseries = (series, idWrapper) => {
    let cardWrapper = document.getElementById(idWrapper);
    cardWrapper.innerHTML = "";
    series.forEach(film => {
        cardWrapper.appendChild(createMovieMinimalCard(film.name, film.first_air_date, film.poster_path, film.id));
    }); 
};

const loadHomePage = (series) => {
    popolaPopularseries(series, "popularseries");
};


const seriesListFilter = document.getElementById("seriesListFilter");

seriesListFilter.addEventListener("change", async () => {
    serie_list = seriesListFilter.value;
    page = 1;
    await loadPage(page, serie_list)
})


const loadPage = async (pageNumber, serie_list) => {
    let seriesPopular = await getResultFromFetch(`https://api.themoviedb.org/3/tv/${serie_list}?language=it-IT&page=${pageNumber}&region=eu`, getOptions);
    loadHomePage(seriesPopular);

    page == 1 ? prevPageBtn.disabled = true : prevPageBtn.disabled = false;
    page == 500 ? nextPageBtn.disabled = true : nextPageBtn.disabled = false;
};

const popularSeriesWrapper = document.getElementById('popularseries');

popularSeriesWrapper.addEventListener("click", (event) => {
    const targetElement = event.target.closest(".more-info");
    if (targetElement) {
        const filmID = targetElement.dataset.idFilm;
        window.location.href = `details.html?id=${filmID}&tipo=serie`;
    }
});

const nextPageBtn = document.getElementById("nextPage");
const prevPageBtn = document.getElementById("prevPage");

nextPageBtn.addEventListener("click", async () => {
    page = Math.min(500, ++page);
    await loadPage(page, serie_list);
})

prevPageBtn.addEventListener("click", async () => {
    page = Math.max(1, --page);
    await loadPage(page, serie_list);
})

let page = 1;
let totalNumPage = 500;

let tentativi = 0;
let delayStandard = 1000;
let success = false;

let serie_list = "popular";

while (!success && tentativi < 5) {
    try {
        const loading = document.getElementById('loading');
    loading.classList.remove('opacity-0');
        await loadPage(page, serie_list);
    loading.classList.add("opacity-0");

        success = true;
    } catch (error) {
        tentativi++;
        console.log("Tentativi rimasti: ", (5 - tentativi))
        console.log(error);
        await wait(delayStandard * tentativi);
    }
}