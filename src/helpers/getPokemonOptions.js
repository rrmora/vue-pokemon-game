import pokemonApi from '../api/pokemonApi';

const getPokemons = () => {
    const pokemonsArr = Array.from(Array(650))

   return pokemonsArr.map((_, index) => index + 1)
}

const getPokemonOptions = async() => {

    const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5)
    const pokemons = await getPokemonsName(mixedPokemons.splice(0,4))
    return pokemons;
}

const getPokemonsName = async([a,b,c,d] = []) => {
//    const resp = await pokemonApi.get('/1')
//     console.log(resp)
    const promiseArr = [
        pokemonApi.get(`/${a}`),
        pokemonApi.get(`/${b}`),
        pokemonApi.get(`/${c}`),
        pokemonApi.get(`/${d}`)
    ];
    const [pok1, pok2, pok3, pok4] = await Promise.all(promiseArr)
    
    return [
        {id: pok1.data.id, name: pok1.data.name},
        {id: pok2.data.id, name: pok2.data.name},
        {id: pok3.data.id, name: pok3.data.name},
        {id: pok4.data.id, name: pok4.data.name}
    ]

}

export default getPokemonOptions