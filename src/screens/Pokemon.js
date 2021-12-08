import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getPokemonDetailsByIDAPI } from '../api/pokemon';
import Favorite from '../components/Pokemon/Favorite';
import Header from '../components/Pokemon/Header';
import Stats from '../components/Pokemon/Stats';
import Type from '../components/Pokemon/Type';
import useAuth from '../hooks/useAuth';

export default function Pokemon({ navigation, route: { params } }) {
  // console.log('Parseado: ', JSON.parse(props.route.params.pokemon))
  const [pokemon, setPokemon] = useState();
  const { auth } = useAuth();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => auth && <Favorite id={pokemon?.id} />,
      headerLeft: () => <Icon name='arrow-left' color='#fff' size={20} style={{ marginLeft: 20 }} onPress={() => navigation.goBack()} />
    })
  }, [navigation, params, pokemon]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getPokemonDetailsByIDAPI(params.id);
        setPokemon(response);
      } catch (error) {
        navigation.goBack();
      }
    })();
  }, [params]);
  if(!pokemon) return null;
  return (
    <ScrollView>
      <Header
        name={pokemon.name}
        order={pokemon.order}
        image={pokemon.sprites.other['official-artwork'].front_default}
        type={pokemon.types[0].type.name}
      />
      <Type types={pokemon.types} />
      <Stats stats={pokemon.stats} />
    </ScrollView>
  )
}
