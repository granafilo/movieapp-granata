export const normalizzaAttore = (attore) => {
    return {
        id: attore.id,
        nome: attore.name || attore.original_name,
        personaggio: attore.character || attore.roles[0].character,
        profile_path: attore.profile_path || null,
        gender: attore.gender
    };
};