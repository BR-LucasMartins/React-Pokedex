import React, { useRef, useState, useEffect } from 'react'
import { FaSearch , FaRandom } from 'react-icons/fa';

import { useFetchPokemons } from '../hooks/useFetchPokemons';

function Search({onSearch, onError}) {

    const[search, setSearch] = useState('');
    const inputRef = useRef(null);
    const [errorSearch, setErrorSearch ] = useState('')

    const {searchPokemons, getRandomPokemons} = useFetchPokemons;

    const handleSubmit = (e) => {
        e.preventDefault();
    
        (async () => {
          try {
            const searchResults = await searchPokemons(search);
            onSearch(searchResults);
            setErrorSearch('')
          } catch (setErrorSearch) {
            setErrorSearch(setErrorSearch);
          }
    
          setSearch('');
          inputRef.current.focus();
        })();
      };

      const handleSurpriseMe = async () => {
        try {
          const randomPokemons = await getRandomPokemons();
          onSearch(randomPokemons);
          setErrorSearch('');
        } catch (error) {
          setErrorSearch('Erro ao buscar Pokémon aleatório');
        }
      };

  return (
    <>
        <form onSubmit={handleSubmit}>
        <span> Search by Id or Name of Pokémon </span>
            <div className="input-wrapper">
                <input 
                type="search" 
                name="search"
                autoComplete='off' 
                ref={inputRef}
                value={search} 
                placeholder='search by id or number of Pokémon' 
                onChange={(e)=> setSearch(e.target.value)}  />
                <button className='btn-submit' type='submit' > <FaSearch/> </button>
            </div>
        </form>

        <button className='btn-search-randon' onClick={handleSurpriseMe}> Surprise me! </button>
    </>
  )
}

export default Search