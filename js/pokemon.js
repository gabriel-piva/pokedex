// --------------------------------------------------------------------------

import { getPokemon } from "./pokeapi.js";
import { getPokemonTeam, addPokemon, removePokemon, setCurrentRegion } from "./storage.js";

// --------------------------------------------------------------------------

// Current Pokemon by URL Index

let pokemon;
const getCurrentPokemon = async () => {
    const url = new URLSearchParams(window.location.search);
    let index = parseInt(url.get('index'));
    if(!index || index < 1 || index > 1010) {
        window.location.assign('index.html');
        return;
    }
    pokemon = await getPokemon(index);
    loadPokemon();
}

// --------------------------------------------------------------------------

// Load Pokemon Data

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
        if(team.length < 6) {
            teamAction = addPokemonToTeam;
        } else {
            document.querySelector('#teamBtn').disabled = true;
        }
    }
    document.querySelector('#teamBtn').addEventListener('click', teamAction);
    document.querySelector('#nextBtn').addEventListener('click', nextPokemon);
    document.querySelector('#previousBtn').addEventListener('click', previousPokemon);
}

// --------------------------------------------------------------------------

// Add Or Remove Pokemon from Team

const addPokemonToTeam = () => {
    if(getPokemonTeam().length == 6) return;
    addPokemon(pokemon.id);
    setCurrentRegion("team");
    window.location.assign('index.html');
}
const removePokemonFromTeam = () => {
    removePokemon(pokemon.id);
    setCurrentRegion("team");
    window.location.assign('index.html');
}

// --------------------------------------------------------------------------

// Next & Previous Pokemon

const nextPokemon = () => (pokemon.id < 1010) && window.location.assign(`pokemon.html?index=${pokemon.id+1}`);
const previousPokemon = () => (pokemon.id > 1) && window.location.assign(`pokemon.html?index=${pokemon.id-1}`);

// --------------------------------------------------------------------------

// Events

window.onload = getCurrentPokemon;
document.querySelector('#pokedexBtn').addEventListener('click', () => window.location.assign('index.html'));

// --------------------------------------------------------------------------
