// --------------------------------------------------------------------------

// Pokemon Team

const getPokemonTeam = () => {
    const team = localStorage.getItem('pokemon_team');
    return team ? JSON.parse(team) : [];
}
const addPokemon = (index) => {
    const team = getPokemonTeam();
    if(team.length == 6 || team.includes(index)) return false;
    team.push(index);
    localStorage.setItem('pokemon_team', JSON.stringify(team));
    return true;
}
const removePokemon = (pokemonId) => {
    const team = getPokemonTeam();
    const index = team.indexOf(pokemonId);
    if (index == -1) return;
    team.splice(index, 1);
    localStorage.setItem('pokemon_team', JSON.stringify(team));
}

export { getPokemonTeam, addPokemon, removePokemon }

// --------------------------------------------------------------------------

// Current Region

const getCurrentRegion = () => localStorage.getItem('pokemon_region');
const setCurrentRegion = (region) => localStorage.setItem('pokemon_region', region);

export { getCurrentRegion, setCurrentRegion }

// --------------------------------------------------------------------------