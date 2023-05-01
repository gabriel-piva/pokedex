// -------------------------------------------------------------------------- 

import { getPokemon, typeImages } from './pokemon.js';

// -------------------------------------------------------------------------- 

// HTML Elements

const pokedex = document.querySelector('.pokedex');
const regionButtons = document.querySelectorAll('header nav button')
const scrollBtn = document.querySelector('#scrollBtn');
const mobileBtn = document.querySelector('#btnMobile');

// --------------------------------------------------------------------------

// Region

let min = 1;
let max = 151;
let currentRegion = "kanto";

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
const changeRegion = async (e) => {
    closeMobile();
    if(currentRegion == e.target.dataset.region) return;
    currentRegion = e.target.dataset.region;
    setRegion();
    pokedex.innerHTML = `<img class="loading" src="images/loading.gif" alt=""></img>`;
    await loadPokedex();
}

// -------------------------------------------------------------------------- 

// Pokedex

let pokemonList;
const getPokemonList = async () => {
    const pokemonList = [];
    for (let i = min; i <= max; i++) {
        pokemonList.push(await getPokemon(i))
    }
    return pokemonList;
}
const loadPokedex = async () => {
    pokemonList = await getPokemonList();
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

//  Mobile Menu

let btnMobileChanged = false;
const toggleMobile = () => {
    document.querySelector('header .container nav').classList.toggle('mobile');
    btnMobileChanged = !btnMobileChanged;
    if(btnMobileChanged) {
        btnMobile.innerHTML = "<i class='bx bx-x'></i>";
        document.body.style.overflow = 'hidden';
    } else {
        btnMobile.innerHTML = "<i class='bx bx-menu'></i>";
        document.body.style.overflow = 'auto';
    }
}
const closeMobile = () => {
    document.querySelector('header .container nav').classList.remove('mobile');
    btnMobileChanged = false;
    document.body.style.overflow = 'auto';
    btnMobile.innerHTML = "<i class='bx bx-menu'></i>";
}

// --------------------------------------------------------------------------

// Scroll to Top

const verifyTop = () => {
    if(window.scrollY > 20) {
        scrollBtn.style.display = 'block';
    } else {
        scrollBtn.style.display = 'none';
    }
}
const scrollTop = () => {
    window.scroll({
        top: 0,
        behavior: "smooth"
    })
}

// -------------------------------------------------------------------------- 

// Events

window.onload = loadPokedex;
regionButtons.forEach(btn => btn.addEventListener('click', (e) => changeRegion(e)));
window.onscroll = verifyTop;
scrollBtn.addEventListener('click', scrollTop);
btnMobile.addEventListener('click', toggleMobile);

// -------------------------------------------------------------------------- 