// -------------------------------------------------------------------------- 

import { getPokemon, typeImages } from './pokemon.js';

// -------------------------------------------------------------------------- 

// HTML Elements

const pokedex = document.querySelector('.pokedex');
const regionButtons = document.querySelectorAll('header .regions button')
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
    pokemonList = await getPokemonList(); 
    loadPokedex();
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
const loadPokedex = () => {
    pokedex.innerHTML = "";
    let targetList = applyFilters(pokemonList);
    if(targetList.length <= 0){
        pokedex.innerHTML = `<img class="loading" src="images/noresults.gif" title='no results'></img>`;
    }
    targetList.forEach(pokemon => {
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

// Filters

let typeFilterOn = false;
let typeSelected = "all";

const applyFilters = () => {
    if(typeFilterOn) {
        return pokemonList.filter(pokemon => pokemon.types.includes(typeSelected));
    }
    return pokemonList;
}
const setTypeFilter = (e) => {
    if(typeSelected == e.target.dataset.type) {
        closeModal();
        return;
    }
    typeSelected = e.target.dataset.type;
    if(typeSelected == "all") {
        typeFilterOn = false;
    } else {
        typeFilterOn = true;
    }
    closeModal();
    loadPokedex();
}

// -------------------------------------------------------------------------- 

//  Mobile Menu

let btnMobileChanged = false;
const toggleMobile = () => {
    document.querySelector('header .container .regions').classList.toggle('mobile');
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
    document.querySelector('header .container .regions').classList.remove('mobile');
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

// Modal Type Filter
const modalType = () => {
    openModal();
    modalContent.innerHTML = `
        <span>Select a type:</span>
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
    document.querySelectorAll(".btnType").forEach(btn => btn.addEventListener("click", (e) => setTypeFilter(e)));
}

// -------------------------------------------------------------------------- 

// Events

window.onload = async () => {
    pokemonList = await getPokemonList();
    loadPokedex();
}
regionButtons.forEach(btn => btn.addEventListener('click', (e) => changeRegion(e)));
window.onscroll = verifyTop;
scrollBtn.addEventListener('click', scrollTop);
mobileBtn.addEventListener('click', toggleMobile);
document.querySelector('#filterBtn').addEventListener('click', modalType);
document.querySelector("#closeModalBtn").addEventListener('click', closeModal);
document.querySelector('.modal').addEventListener('click', (e) => {
    if(e.target == document.querySelector('.modal')) {
        closeModal() 
    }
});

// -------------------------------------------------------------------------- 