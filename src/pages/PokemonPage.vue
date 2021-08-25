<template>
<div v-if="!pokemon">Cargando...</div>
  <div v-else>
      <h1>¿Quién es el Pokémon?</h1>
      <PokemonImage :pokemonId="pokemon.id" :showPokemon="showPokemon" />
      <PokemonOptions :pokemons="pokemonsArr" @pokemon-selected="checkAnswer($event)"/>

      <template v-if="showAnswer">
        <h2 class="fade-in">{{message}}</h2>
        <button @click="reset">Reinicar juego</button>
      </template>
  </div>
</template>

<script>
  import PokemonImage from '@/components/PokemonImage'
  import PokemonOptions from '@/components/PokemonOptions'
  import getPokemonOptions from '@/helpers/getPokemonOptions'

export default {
  components: {
    PokemonImage,
    PokemonOptions,
  },
  data() {
    return {
      pokemonsArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: ''
    }
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonsArr = await getPokemonOptions()
      const rnd = Math.floor(Math.random() * 4)
      this.pokemon = this.pokemonsArr[rnd]
    },
    checkAnswer($event) {
      this.showPokemon = true
      this.showAnswer = true
      if ($event === this.pokemon.id) {
        this.message = `Correcto, ${this.pokemon.name}`
      } else {
        this.message = `Lo siento no haz acertado, era: ${this.pokemon.name}`
      }
    },
    reset() {
      this.pokemonsArr = [],
      this.showPokemon = false,
      this.showAnswer  = false,
      this.pokemon = null,
      this.mixPokemonArray()
    }
  },
  mounted() {
    this.mixPokemonArray()
  }
  

}
</script>

<style>

</style>