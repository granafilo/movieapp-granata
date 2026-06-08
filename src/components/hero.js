import { getJsonFromFetch, getOptions, getResultFromFetch } from "../utils/utils";

export const loadHeroHomepage = async (media) => {
    const heroTitle = document.getElementById("heroTitle");
    const heroOverview = document.getElementById("heroOverview");
    const heroWrapper = document.getElementById("heroWrapper");

    const type = media.type == "tv" ? "tv" : "movie";    

    heroTitle.innerText = media.title;
    heroOverview.innerText = media.overview;

    let backdropsArray = await getJsonFromFetch(`https://api.themoviedb.org/3/${type}/${media.id}/images`, getOptions);

    backdropsArray = backdropsArray.backdrops?.[0] ? backdropsArray.backdrops : backdropsArray.posters;

    let int = 0;
    
    const cambiaImg = (elemento, arrayImg) => {
        
        elemento.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${arrayImg[(int % arrayImg.length)].file_path})`;
        
        int++;
    };

    let interval;

    cambiaImg(heroWrapper, backdropsArray)

    interval = setInterval(() => {
        cambiaImg(heroWrapper, backdropsArray);
    }, 10000);
};

