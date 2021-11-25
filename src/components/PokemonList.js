import React from 'react'
import { View, ActivityIndicator, FlatList, StyleSheet, Platform } from 'react-native'
import PokemonCard from './PokemonCard'

export default function PokemonList({ pokemons, loadPokemons, isNext }) {
  const loadMore = () => {
    console.log('Cargando más ppokemons');
    loadPokemons();
  }
  return (
    <FlatList
      data={pokemons}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      keyExtractor={(pokemon) => String(pokemon.id)}
      renderItem={({item}) => <PokemonCard pokemon={item} /> }
      contentContainerStyle={styles.flatListContentContainer}
      onEndReached={isNext && loadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        isNext && ( 
          <ActivityIndicator
            size='large'
            style={styles.spinner}
            color='#AEAEAE'
          />
        )
      }
    />
  )
}

const isAndroid = Platform.OS === 'android';

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 5,
    marginTop: isAndroid ? 30 : 0
  },
  spinner: {
    marginTop: 20,
    marginBottom: isAndroid ? 90 : 60
  }
})