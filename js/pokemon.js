// --------------------------------------------------------------------------

import { getPokemon } from "./pokeapi.js";

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
}

// --------------------------------------------------------------------------

// Events

window.onload = getCurrentPokemon;

// --------------------------------------------------------------------------
