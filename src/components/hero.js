import { getJsonFromFetch, getOptions, getResultFromFetch } from "../utils/utils";

export const loadHeroHomepage = async (media) => {
    const heroTitle = document.getElementById("heroTitle");
    const heroOverview = document.getElementById("heroOverview");
    const heroWrapper = document.getElementById("heroWrapper");

    heroTitle.innerText = media.title;
    heroOverview.innerText = media.overview;

    const backdropsArray = await getJsonFromFetch(`https://api.themoviedb.org/3/movie/${media.id}/images?language=en-US`, getOptions);

    console.log(backdropsArray);
    
    console.log(media);
    
    

    let int = 0;
    const cambiaImg = (elemento, arrayImg) => {
        elemento.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${arrayImg[(int % arrayImg.length)].file_path})`;
        int++;
    };

    let interval;

    cambiaImg(heroWrapper, backdropsArray.backdrops)

    interval = setInterval(() => {
        cambiaImg(heroWrapper, backdropsArray.backdrops)
    }, 10000);
};

