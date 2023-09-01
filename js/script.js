const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

const buttonBack = document.querySelector('.btn-back');
const buttonNext = document.querySelector('.btn-next');

let countPokemon = 1;

const fetchPokemon = async(pokemon) => {
     const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
     if(APIResponse.status === 200){
        const data = await APIResponse.json(); 
        return data;
     } 
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = "Carregando...";
    pokemonNumber.innerHTML = " "; 
    const data = await fetchPokemon(pokemon);
    if(data){
        pokemonImage.style.display="block";
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; 
        input.value = " ";
        countPokemon = data.id;
        console.log('test', data)
    }else{
        pokemonImage.style.display="none";
        pokemonName.innerHTML = "Não encontrado :(";
        pokemonNumber.innerHTML = " "; 
    }
}

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    console.log('test', input.value)
});

buttonBack.addEventListener('click',(event)=>{
    countPokemon -= 1;
    if(countPokemon > 1){
        renderPokemon(countPokemon);
    }
});

buttonNext.addEventListener('click',(event)=>{
    countPokemon += 1;
    renderPokemon(countPokemon);
});

renderPokemon(countPokemon);