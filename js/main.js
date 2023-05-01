// -------------------------------------------------------------------------- 

import { getPokemon, typeImages } from './pokemon.js';

// -------------------------------------------------------------------------- 

// HTML Elements

const pokedex = document.querySelector('.pokedex');

// --------------------------------------------------------------------------

// Initial Region

let currentRegion = "kanto";
let min = 1
let max = 151;

const setRegion = () => {
    switch(currentRegion) {
        case "kanto":
            min = 1;
            max = 151;
            break;
        case "johto":
            min = 152;
            max = 251;
            break;
        case "hoenn":
            min = 252;
            max = 386;
            break;
        case "sinnoh":
            min = 387;
            max = 494;
            break;
        case "unova":
            min = 495;
            max = 649;
            break;
        case "kalos":
            min = 650;
            max = 721;
            break;
        case "alola":
            min = 722;
            max = 809;
            break;
        case "galar":
            min = 810;
            max = 905;
            break;
        case "paldea":
            min = 906;
            max = 1010;
            break;
        default:
            min = 1;
            max = 1010;
    }
}

// -------------------------------------------------------------------------- 

// Pokedex

const loadPokedex = (pokemonList) => {
    pokedex.innerHTML = "";
    pokemonList.forEach(pokemon => {
        pokedex.innerHTML += `
            <div class="pokemon">
                <div class="pokemonId">
                    <div class="number">${pokemon.id}</div>
                    <img src="images/pokeicon.png">
                    <div class="name">${pokemon.name}</div>
                </div>
                <img src="${pokemon.imageUrl}" alt="">
                <div class="types">
                    ${typeImages(pokemon.types)}
                </div>
            </div>
        `
    })
}

// -------------------------------------------------------------------------- 

// Test

let pokemon1 = await getPokemon(252);
let pokemon2 = await getPokemon(253);
let pokemon3 = await getPokemon(254);

let testList  = [];
testList.push(pokemon1)
testList.push(pokemon2)
testList.push(pokemon3)

loadPokedex(testList);

// -------------------------------------------------------------------------- 