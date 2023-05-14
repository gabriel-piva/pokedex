// -------------------------------------------------------------------------- 

import { getPokemon } from './pokeapi.js';
import { closeMobile, toggleMobile, scrollTop, verifyTop, getPokemonTeam } from './utils.js';

// --------------------------------------------------------------------------

// Pokedex

const pokedex = document.querySelector('.pokedex');
let pokemonList;

const getPokemonList = async () => {
    const pokemonList = [];
    for (let i = min; i <= max; i++) {
        pokemonList.push(await getPokemon(i))
    }
    return pokemonList;
}
const showPokedex = () => {
    pokedex.innerHTML = "";
    let targetList = applyFilters();
    if(targetList.length <= 0){
        pokedex.innerHTML = `<img class="loading" src="images/noresults.gif" title='no results'></img>`;
    }
    targetList.forEach(pokemon => pokedex.innerHTML += pokemon.toHTML());
    document.querySelectorAll(".pokedex .pokemon").forEach(pokemon => pokemon.addEventListener('click', (e) => openPokemon(e)));
}
const loadPokedex = async () => {
    pokemonList = await getPokemonList();
    showPokedex();
}
const openPokemon = async (e) => {
    const pokemonEl = e.target.closest('.pokemon');
    if(!pokemonEl) return;
    window.location.assign(`../pokemon.html?index=${pokemonEl.dataset.index}`);
}

// -------------------------------------------------------------------------- 

// Pokemon Team

const showTeam = async () => {
    const team = [];
    const teamIdx = getPokemonTeam();
    for(let i = 0; i < 6; i++) {
        if(!teamIdx[i]) break;
        team.push(await getPokemon(teamIdx[i]))
    }
    pokemonList = team;
    document.querySelector("#searchInput").value = "";
    document.querySelector("#searchInput").placeholder = `Search in Team`;
    currentRegion = "team";
    closeModal();
    showPokedex();
}

// -------------------------------------------------------------------------- 

// Regions

const regions = {
    kanto:  { min: 1, max: 151 },
    johto:  { min: 152, max: 251 },
    hoenn:  { min: 252, max: 386 },
    sinnoh: { min: 387, max: 494 },
    unova:  { min: 495, max: 649 },
    kalos:  { min: 650, max: 721 },
    alola:  { min: 722, max: 809 },
    galar:  { min: 810, max: 905 },
    paldea: { min: 906, max: 1010 }
};

let currentRegion = "kanto";
let min = 1;
let max = 151;

const setRegion = () => {
    const region = regions[currentRegion] || regions["kanto"];
    document.querySelector("#searchInput").placeholder = `Search in ${currentRegion.charAt(0).toUpperCase() + currentRegion.slice(1)}`;
    min = region.min;
    max = region.max;
}
const changeRegion = async (e) => {
    closeMobile();
    if(currentRegion == e.target.dataset.region) return;
    currentRegion = e.target.dataset.region;
    setRegion();
    pokedex.innerHTML = `<img class="loading" src="images/loading.gif" alt=""></img>`;
    pokemonList = await getPokemonList(); 
    showPokedex();
}

// -------------------------------------------------------------------------- 

// Filters

// Type Filter
let typeFilterOn = false;
let typeSelected = "all";
const typeFilter = (list) => list.filter(pokemon => pokemon.getTypeList().includes(typeSelected));
const handleTypeChange = (e) => {
    if(typeSelected == e.target.dataset.type) {
        closeModal();
        return;
    }
    typeSelected = e.target.dataset.type;
    typeFilterOn = typeSelected === "all" ? false : true;
    closeModal();
    showPokedex();
}

// Search Filter
let searchFilterOn = false;
let timeoutId;
const searchFilter = (list) => {
    const search = document.querySelector("#searchInput").value.trim().toLowerCase();
    return list.filter(pokemon => pokemon.name.toLowerCase().includes(search));
}
const handleSearch = () => {
    searchFilterOn = document.querySelector("#searchInput").value.trim().length > 0;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => showPokedex(), 220);
}

// Apply all filters
const applyFilters = () => {
    let targetList = pokemonList;
    if(typeFilterOn) {
        targetList = typeFilter(targetList);
    }
    if(searchFilterOn) {
        targetList = searchFilter(targetList);
    }
    return targetList;
}

// -------------------------------------------------------------------------- 

// Modals

const modal = document.querySelector('.modal');
const modalContainer = document.querySelector('.modalContainer');
const modalContent = document.querySelector('.modalContent');

const openModal = () => {
    modal.classList.add('active');
    modalContainer.classList.add('active');
}
const closeModal = () => {
    modal.classList.remove('active');
    modalContainer.classList.remove('active');
    modalContainer.classList.remove('modalType');
    modalContent.innerHTML = '';
}
const modalType = () => {
    openModal();
    modalContent.innerHTML = `
        <span>Select a Type</span>
        <div class="types">
            <button type="button" class="btnType">
                <img src="images/types/water.png" data-type="water">
            </button>
            <button type="button" class="btnType">
                <img src="images/types/steel.png" data-type="steel">
            </button>
            <button type="button" class="btnType">
                <img src="images/types/rock.png" data-type="rock">
            </button>
            <button type="button" class="btnType">
                <img src="images/types/psychic.png" data-type="psychic">
            </button>
            <button type="button" class="btnType">
                <img src="images/types/poison.png" data-type="poison">
            </button>
            <button type="button" class="btnType">
                <img src="images/types/normal.png" data-type="normal">
            </button>
            <button type="button" class="btnType">
                <img src="images/types/ice.png" data-type="ice">
            </button>
            <button type="button" class="btnType">
                <img src="images/types/ground.png" data-type="ground">
            </button>
            <button type="button" class="btnType">
                <img src="images/types/grass.png" data-type="grass">
            </button>
            <button type="button" class="btnType">
                <img src="images/types/ghost.png" data-type="ghost">
            </button>
            <button type="button" class="btnType">
                <img src="images/types/flying.png" data-type="flying">
            </button>
            <button type="button" class="btnType">
                <img src="images/types/fire.png" data-type="fire">
            </button>
            <button type="button" class="btnType">
                <img src="images/types/fighting.png" data-type="fighting">
            </button>
            <button type="button" class="btnType">
                <img src="images/types/fairy.png" data-type="fairy">
            </button>
            <button type="button" class="btnType">
                <img src="images/types/electric.png" data-type="electric">
            </button>
            <button type="button" class="btnType">
                <img src="images/types/dragon.png" data-type="dragon">
            </button>
            <button type="button" class="btnType">
                <img src="images/types/dark.png" data-type="dark">
            </button>
            <button type="button" class="btnType">
                <img src="images/types/bug.png" data-type="bug">
            </button>
            <button type="button" class="btnType">
                <img src="images/types/all.png" data-type="all">
            </button>
        </div>
    `;
    modalContainer.classList.add('modalType');
    document.querySelectorAll(".btnType").forEach(btn => btn.addEventListener("click", (e) => handleTypeChange(e)));
}

// -------------------------------------------------------------------------- 

// Events

window.onload = loadPokedex;
window.onscroll = verifyTop;
document.querySelector('#btnScroll').addEventListener('click', scrollTop);
document.querySelectorAll('header .regions button').forEach(btn => btn.addEventListener('click', (e) => changeRegion(e)));
document.querySelector('#btnMobile').addEventListener('click', toggleMobile);
document.querySelector('#typeBtn').addEventListener('click', modalType);
document.querySelector('#teamBtn').addEventListener('click', showTeam);
document.querySelector('#searchInput').addEventListener('input', handleSearch);
document.querySelector("#closeModalBtn").addEventListener('click', closeModal);
modal.addEventListener('click', (e) => e.target == modal && closeModal());

// -------------------------------------------------------------------------- 