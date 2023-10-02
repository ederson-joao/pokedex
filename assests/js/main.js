const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151;
const limit = 8;
let offset = 0;

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHTML = pokemons.map((pokemon) => `
      <li class="pokemon ${pokemon.type}">
      <div class="flip">
        <div class="frontCard">
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>

          <div class="frontDetail">
              <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
              </ol>

              <img src="${pokemon.photo}" alt="${pokemon.name}">
          </div>
        </div>
        <div class="backCard">
          <h1>Abilities</h1>
          <div class="backDetail">
            <ol class="abilities">
              ${pokemon.abilities.map((ability) => `<li class="ability ${ability}">${ability}</li>`).join('')}
            </ol>
            <h1>Information</h1>
            <div class="information">
            <p class="height">Height: ${pokemon.height}</p>
            <p class="weight">Weight: ${pokemon.weight}</p>
            </div>
          </div> 
        </div>
      </div>
      </li>
  `).join('')
  
  pokemonList.innerHTML += newHTML
 })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
  offset += limit
  const qtdRecordsWithNexPage = offset + limit

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset
    loadPokemonItens(offset, newLimit)

    loadMoreButton.parentElement.removeChild(loadMoreButton)
  } else {
  loadPokemonItens(offset, limit)
  }
})