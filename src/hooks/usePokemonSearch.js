import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const usePokemonSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchPokemon = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/pokemons`, {
        params: {
          q: query, // Para busca por nome ou ID
        },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Erro ao buscar Pokémon:', error);
    } finally {
      setLoading(false);
    }
  };

  return { searchResults, loading, searchPokemon };
};
