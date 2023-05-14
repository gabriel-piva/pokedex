// --------------------------------------------------------------------------

import { getPokemon } from "./pokeapi.js";
import { addPokemon, removePokemon } from "./utils.js";

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
}

// --------------------------------------------------------------------------

// Add & Remove Pokemon from Team

const addPokemonToTeam = (index) => addPokemon(index) ? showTeam() : null;
const removePokemonFromTeam = (index) => {
    removePokemon(index);
    showTeam();
}

// --------------------------------------------------------------------------

// Events

window.onload = getCurrentPokemon;
document.querySelector('#pokedexBtn').addEventListener('click', () => window.location.assign('../index.html'))

// --------------------------------------------------------------------------
