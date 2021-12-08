import AsyncStorage from '@react-native-async-storage/async-storage';
import { includes, pull } from 'lodash';
import { FAVORITE_STORAGE } from '../utils/constants';

export async function getPokemonsFavoriteAPI() {
  try {
    const response = await AsyncStorage.getItem(FAVORITE_STORAGE);
    return JSON.parse(response || '[]');
  } catch (error) {
    throw error;
  }
}

export async function addPokemonFavoriteAPI(id) {
  try {
    const favorites = await getPokemonsFavoriteAPI();
    favorites.push(id)
    await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(favorites));
  } catch (error) {
    throw error;
  }
}

export async function isPokemonFavoriteAPI(id) {
  try {
    const response = await getPokemonsFavoriteAPI();
    return includes(response, id);
  } catch (error) {
    throw error;
  }
}

export async function removePokemonFavoriteAPI(id) {
  try {
    const favorites = await getPokemonsFavoriteAPI();
    const newFavorites = pull(favorites, id);
    await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(newFavorites));
  } catch (error) {
    throw error;
  }
}