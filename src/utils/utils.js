export const getResultFromFetch = async (url, options) => {
  let film = await fetch(url, options)

  let response = await film.json();

  return response.results;
};

export const getJsonFromFetch = async (url, options) => {
  let film = await fetch(url, options)

  let response = await film.json();

  return response;
};

export const getOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_API_KEY_TMDB
  }
};

export const getReleaseDate = async (id, lang = "IT") => {
    let releaseDate = await getResultFromFetch(`https://api.themoviedb.org/3/movie/${id}/release_dates`, getOptions);
    const data = releaseDate.find(date => date.iso_3166_1 === lang).release_dates[0].release_date;    

    return new Date(data);
};

export const wait = (ms) => new Promise(r => setTimeout(r, ms));