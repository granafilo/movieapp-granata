import movies from "./movies.json"

const ordinaPopular = (movies) => {
  let film = [...movies];
  return film.sort((a,b) =>  b.popularity - a.popularity);
};


let filmOrdinatiPopolarità = ordinaPopular(movies);

