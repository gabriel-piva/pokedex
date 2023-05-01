// -------------------------------------------------------------------------- 

import { getPokemon } from './pokemon.js';

// -------------------------------------------------------------------------- 

let min, max;

// -------------------------------------------------------------------------- 

// Region Min & Max

const setRegion = (currentRegion) => {
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