// -------------------------------------------------------------------------- 

// Class Pokemon

class Pokemon {
    #id;
    #name;
    #imageUrl;
    #types;

    constructor(id, name, imageUrl, types) {
        this.#id = id;
        this.#name = name;
        this.#imageUrl = imageUrl;
        this.#types = types;
    }

    // Getters
    get id () {
        return this.#id;
    }
    get name () {
        return this.#name;
    }
    get imageUrl () {
        return this.#imageUrl;
    }
    get types () {
        return this.#types;
    }
}

// -------------------------------------------------------------------------- 

// PokeAPI

const getPokemon = async (number) => {
    const response = await fetch ("https://pokeapi.co/api/v2/pokemon/" + number);
    const pokemonJson = await response.json();
    let pokemon = new Pokemon(
        await pokemonJson.id,
        await pokemonJson.name,
        getImage(await pokemonJson.id),
        typeList(await pokemonJson.types)
    );
    return pokemon;
}
const getImage = (number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`;

// --------------------------------------------------------------------------

// Types

const typeList = (types) => { 
    const typeArray = []; 
    types.map(typeItem => typeArray.push(typeItem.type.name)); 
    return typeArray; 
}
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
const typeImages = (types) => {
    let typeImages = "";
    types.forEach(type => typeImages += `<img src='images/types/${type}.png'>`);
    return typeImages;
}

// --------------------------------------------------------------------------

export { getPokemon, typeImages };

// --------------------------------------------------------------------------