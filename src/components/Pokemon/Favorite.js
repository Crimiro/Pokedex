import React, { useState, useEffect } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { addPokemonFavoriteAPI, getPokemonsFavoriteAPI, isPokemonFavoriteAPI, removePokemonFavoriteAPI } from '../../api/favorite';

export default function Favorite({ id }) {
  const [isFavorite, setIsFavorite] = useState(undefined);
  const [reloadCheck, setrReloadCheck] = useState(false);
  const Icon = isFavorite ? FontAwesome : FontAwesome5;
  useEffect(() => {
    (async () => {
      try {
        const response = await isPokemonFavoriteAPI(id);
        setIsFavorite(response);
      } catch (error) {
        setIsFavorite(false);
      }
    })()
  }, [id, reloadCheck]);
  const onReloadCheckFavorite = () => {
    setrReloadCheck(prev => !prev);
  }
  const addFavorite = async () => {
    try {
      await addPokemonFavoriteAPI(id);
      onReloadCheckFavorite();
    } catch (error) {
      console.log(error);
    }
  }
  const removeFavorite = async () => {
    try {
      await removePokemonFavoriteAPI(id);
      onReloadCheckFavorite();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Icon name='heart' color='#fff' size={20} onPress={isFavorite ? removeFavorite : addFavorite} style={{ marginRight: 20 }}></Icon>
  )
}
