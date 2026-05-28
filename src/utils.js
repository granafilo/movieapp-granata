export const fetchPopular = async (url, options) => {
  let film = await fetch(url, options)

  let response = await film.json();

  return response.results;
};

export const getOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:import.meta.env.VITE_API_KEY_TMDB
  }
};

export const wait = (ms) => new Promise(r => setTimeout(r, ms));