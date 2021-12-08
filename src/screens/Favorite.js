import React, { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Text } from 'react-native'
import { getPokemonsFavoriteAPI } from '../api/favorite';
import { getPokemonDetailsByIDAPI } from '../api/pokemon';
import useAuth from '../hooks/useAuth';
import PokemonList from '../components/PokemonList';
import NoLogged from '../components/NoLogged';

export default function Favorite() {
  const [pokemons, setPokemons] = useState([]);
  console.log(pokemons);
  const { auth } = useAuth();
  useFocusEffect(
    useCallback(() => {
      if(auth) {
        (async () => {
          const response = await getPokemonsFavoriteAPI();
          const pokemonsArray = [];
          for await (const id of response) {
            const pokemonDetails = await getPokemonDetailsByIDAPI(id);
            pokemonsArray.push({
              id: pokemonDetails.id,
              name: pokemonDetails.name,
              type: pokemonDetails.types[0].type.name,
              order: pokemonDetails.order,
              image: pokemonDetails.sprites.other['official-artwork'].front_default
            });
          }
          setPokemons(pokemonsArray);
        })()
      }
    }, [auth])
  )
  
  return (
    !auth ? <NoLogged /> : <PokemonList pokemons={pokemons} />
  )
}
