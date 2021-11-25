import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text } from 'react-native'
import { getPokemonsApi, getPokemonDetailsByURLAPI } from '../api/pokemon';
import PokemonList from '../components/PokemonList';

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [nextURL, setNextURL] = useState();
  useEffect(() => {
    (async() => loadPokemons())();
  }, []);

  const loadPokemons = async () => {
    try {
      const response = await getPokemonsApi(nextURL);
      setNextURL(response.next);
      const pokemonsArray = [];
      for await (const pokemon of response.results) {
        const pokemonDetails = await getPokemonDetailsByURLAPI(pokemon.url);
        pokemonsArray.push({
          id: pokemonDetails.id,
          name: pokemonDetails.name,
          type: pokemonDetails.types[0].type.name,
          order: pokemonDetails.order,
          image: pokemonDetails.sprites.other['official-artwork'].front_default
        });
      }
      setPokemons([...pokemons, ...pokemonsArray]);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <SafeAreaView>
      <Text>Pokedex</Text>
      <PokemonList pokemons={pokemons} loadPokemons={loadPokemons} isNext={nextURL} />
    </SafeAreaView>
  )
}
