// -------------------------------------------------------------------------- 

// Pokemon Class & API Connection

// -------------------------------------------------------------------------- 

// Class Pokemon

class Pokemon {
    #id;
    #name;
    #image;
    #types;
    #stats;

    constructor(id, name, types, stats) {
        this.#id = id;
        this.#name = name;
        this.#image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.id}.png`;
        this.#types = types;
        this.#stats = stats;
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
    get stats () {
        return this.#stats;
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
    toHTML() {
        return `
            <div class="pokemon" data-index="${this.id}">
                <div class="pokemonId">
                    <div class="number">${this.id}</div>
                    <img src="images/pokeicon.png">
                    <div class="name">${this.name}</div>
                </div>
                <img src="${this.image}" alt="">
                <div class="types">
                    ${this.getTypeImages()}
                </div>
            </div>
        `;
    }
    getStatsValues() {
        return {
            hp: this.stats[0].base_stat,
            attack: this.stats[1].base_stat,
            defense: this.stats[2].base_stat,
            spAttack: this.stats[3].base_stat,
            spDefense: this.stats[4].base_stat,
            speed: this.stats[5].base_stat
        }
    }
    getStatsHTML() {
        const values = this.getStatsValues();
        const maxValues = {
            hp: 255,
            attack: 190,
            defense: 230,
            spAttack: 194,
            spDefense: 230,
            speed: 180,
        };
        let result = '';
        for (let stat in values) {
            const value = values[stat];
            const maxValue = maxValues[stat];
            result += `
            <div class="stat">
                <div class="label">${stat}</div>
                <div class="barMax">
                    <div class="barValue" style="width: ${value / maxValue * 100}%;"></div>
                </div>
                <div class="value">${value}</div>
            </div>
            `;
        }
        return result;
    }
}

// -------------------------------------------------------------------------- 

// PokeAPI

const getPokemon = async (number) => {
    const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${number}`);
    const pokemonJson = await response.json();
    let pokemon = new Pokemon(
        await pokemonJson.id,
        await pokemonJson.name,
        await pokemonJson.types,
        await pokemonJson.stats
    );
    return pokemon;
}

// -------------------------------------------------------------------------- 

export { getPokemon };

// --------------------------------------------------------------------------