export const normalizzaMedia = (media) => {
    return {
        id: media.id,
        title: media.title || media.name,
        overview: media.overview || "Descrizione non disponibile nella lingua selezionata",
        image: media.backdrop_path,
        data: media.release_date || media.first_air_date,
        avgVote: media.vote_average,
        mediaType: media.media_type
    };
};