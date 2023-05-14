// --------------------------------------------------------------------------

import { getPokemon } from "./pokeapi.js";
import { getPokemonTeam, addPokemon, removePokemon } from "./utils.js";

// --------------------------------------------------------------------------

// Current Pokemon by URL Index

let pokemon;
const getCurrentPokemon = async () => {
    const url = new URLSearchParams(window.location.search);
    let index = parseInt(url.get('index'));
    if(!index || index < 1 || index > 1010) {
        window.location.assign('../index.html');
        return;
    }
    pokemon = await getPokemon(index);
    loadPokemon();
}
const loadPokemon = () => {
    document.querySelector(".sprite").innerHTML += pokemon.toHTML();
    document.querySelector(".stats").innerHTML += pokemon.getStatsHTML();
    document.title += `: ${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}`;
    const team = getPokemonTeam();
    let teamAction;
    if(team.includes(pokemon.id)) {
        teamAction = removePokemonFromTeam;
        document.querySelector('#teamBtn').innerHTML = `<i class='bx bxs-x-square'></i>Remove from team`;
    } else {
        teamAction = addPokemonToTeam;
    }
    document.querySelector('#teamBtn').addEventListener('click', teamAction);
}

// --------------------------------------------------------------------------

// Add Or Remove Pokemon from Team

const addPokemonToTeam = () => { 
    addPokemon(pokemon.id);
    window.location.assign('../index.html');
}
const removePokemonFromTeam = () => {
    removePokemon(pokemon.id);
    window.location.assign('../index.html');
}

// --------------------------------------------------------------------------

// Events

window.onload = getCurrentPokemon;
document.querySelector('#pokedexBtn').addEventListener('click', () => window.location.assign('../index.html'));

// --------------------------------------------------------------------------
