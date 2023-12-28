const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonType = document.querySelector('.pokemon__type')
const pokemonHp = document.querySelector('.pokemon__hp')
const pokemonAttack = document.querySelector('.pokemon__attack')


const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const checkShiny = document.querySelector('.shiny');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;
let data;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200) {
        data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    input.value = '';
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';


    const data = await fetchPokemon(pokemon);
    const types = data.types.map(info => info.type.name);
    const status = data.stats.map(info => info.base_stat);

    if (data) {
        pokemonImage.style.display = 'block'
        pokeImage()
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id
        pokemonType.innerHTML = types
        pokemonHp.textContent = `Hp: ${status[0]}`
        pokemonAttack.textContent = `Attack: ${status[1]}`

        searchPokemon = data.id
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :(';
        pokemonNumber.innerHTML = '';
    }
}


const pokeImage = () => {
    if (data && checkShiny.checked) {
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];

    } else if (data && data.id > 649) {
        pokemonImage.src = data['sprites']['versions']['generation-viii']['icons']['front_default'];
        pokemonImage.style.height = '31%'
    } else if (data) {
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

checkShiny.addEventListener('change', function () {
    pokeImage();
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);