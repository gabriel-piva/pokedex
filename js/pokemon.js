// -------------------------------------------------------------------------- 

// Class Pokemon

class Pokemon {
    #id;
    #name;
    #image;
    #types;

    constructor(id, name, types) {
        this.#id = id;
        this.#name = name;
        this.#image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.id}.png`;
        this.#types = types;
    }

    // Getters
    get id () {
        return this.#id;
    }
    get name () {
        return this.#name;
    }
    get image () {
        return this.#image;
    }
    get types () {
        return this.#types;
    }

    // Methods
    getTypeList() {
        const typeList = []; 
        this.#types.map(typeItem => typeList.push(typeItem.type.name)); 
        return typeList; 
    }
    getTypeImages() {
        let typeImages = "";
        this.getTypeList().forEach(type => typeImages += `<img src='images/types/${type}.png'>`);
        return typeImages;
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
        await pokemonJson.types
    );
    return pokemon;
}

// -------------------------------------------------------------------------- 

export { getPokemon };

// --------------------------------------------------------------------------