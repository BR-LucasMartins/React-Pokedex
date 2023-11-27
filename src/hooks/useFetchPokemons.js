import { useEffect, useState } from "react";
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const useFetchPokemons = {
   
  getPokemons: async (count = 12) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pokemons`, {
        params: {
          _limit: count,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar pokémons:', error);
      throw error;
    }
  },

  getPokemonById: async (id) => {

    if (id <= 0 || id >= 493) {
      return null;
      console.log('id não existe')
    }
    try {
      const response = await axios.get(`${API_BASE_URL}/pokemons/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar o Pokémon por ID:', error);
      throw error;
    }
  },


  searchPokemons: async (query) => {
    try {
      const lowerCaseQuery = query.toLowerCase();
      const isNumeric = !isNaN(lowerCaseQuery);
  
      // Faça a consulta usando uma expressão regular para encontrar correspondências parciais no nome do Pokémon ou pelo ID
      const response = await axios.get(`${API_BASE_URL}/pokemons/`, {
        params: isNumeric ? { id: lowerCaseQuery } : { name_like: lowerCaseQuery },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar Pokémon:', error);
    }
  },

  filterPokemons: async (type) => {
    try {

      // Faça a consulta usando uma expressão regular para encontrar correspondências parciais no nome do Pokémon ou pelo ID
      const response = await axios.get(`${API_BASE_URL}/pokemons/`, {
        params: { 
          main_type: type
         },
      });
  
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar Pokémon:', error);
    }
  },

  generateRandomIds: (count) => {
    const randomIds = [];
    const maxId = 493;

    while (randomIds.length < count) {
      const randomId = Math.floor(Math.random() * maxId) + 1;
      if (!randomIds.includes(randomId)) {
        randomIds.push(randomId);
      }
    }

    return randomIds;
  },
  getRandomPokemons: async (count = 24) => {
    try {
      const randomIds = useFetchPokemons.generateRandomIds(count);

      const promises = randomIds.map(async (id) => {
        const response = await axios.get(`${API_BASE_URL}/pokemons/${id}`);
        return response.data;
      });

      const randomPokemons = await Promise.all(promises);
      return randomPokemons;
    } catch (error) {
      console.error('Erro ao buscar Pokémon aleatório:', error);
      throw error;
    }
  }
}

