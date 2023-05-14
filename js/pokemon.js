// --------------------------------------------------------------------------

import { getPokemon } from "./pokeapi.js";
import { getPokemonTeam, addPokemon, removePokemon, setCurrentRegion } from "./utils.js";

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
    // setTypeColor();
}

// --------------------------------------------------------------------------

// Add Or Remove Pokemon from Team

const addPokemonToTeam = () => {
    if(getPokemonTeam().length == 6) return;
    addPokemon(pokemon.id);
    setCurrentRegion("team");
    window.location.assign('../index.html');
}
const removePokemonFromTeam = () => {
    removePokemon(pokemon.id);
    setCurrentRegion("team");
    window.location.assign('../index.html');
}

// --------------------------------------------------------------------------

// Type Pokemon Colors

const typeColor = (type) => {
    if(type == "water") return "#5090D6";
    if(type == "steel") return "#5A8EA2";
    if(type == "rock") return "#C5B78C";
    if(type == "psychic") return "#FA7179";
    if(type == "poison") return "#AA6BC8";
    if(type == "normal") return "#929DA3";
    if(type == "ice") return "#73CEC0";
    if(type == "ground") return "#D97845";
    if(type == "grass") return "#63BC5A";
    if(type == "ghost") return "#5269AD";
    if(type == "flying") return "#8FA9DE";
    if(type == "fire") return "#FF9D55";
    if(type == "fighting") return "#CE416B";
    if(type == "fairy") return "#EC8FE6";
    if(type == "electric") return "#F4D23C";
    if(type == "dragon") return "#0B6DC3";
    if(type == "dark") return "#5A5465";
    if(type == "bug") return "#91C12F";
}
const setTypeColor = () => {
    const mainType = pokemon.getTypeList()[0];
    const color = typeColor(mainType);
    document.documentElement.style.setProperty('--type', color);
}

// --------------------------------------------------------------------------

// Events

window.onload = getCurrentPokemon;
document.querySelector('#pokedexBtn').addEventListener('click', () => window.location.assign('../index.html'));

// --------------------------------------------------------------------------
