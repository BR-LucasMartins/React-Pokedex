import React, { useState , useEffect } from 'react'
import { useMediaQuery } from '@mui/material';

import { useFetchPokemons } from '../hooks/useFetchPokemons';

//resources
import Banner from '../components/Banner'
import banner_home from '../assets/images/banner-home.png';
import banner_home_mobile from '../assets/images/banner-home-mobile.png'
import CardPokemon from '../components/Cards/CardPokemon';
import Search from '../components/Search';
import Loader from '../components/Loader';
import FilterTypes from '../components/FilterTypes';

function Home() {
  const isMobile = useMediaQuery('(max-width: 992px)');
  const [pokemons, setPokemons] = useState([]);
  const [count, setCount] = useState(12); // Contador para rastrear o número total de Pokémon carregados.
  const [loading , setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const { getPokemons } = useFetchPokemons;

  const loadMorePokemons = async () => {
    try {
      const morePokemons = await getPokemons(count + 12);
      setPokemons([...pokemons, ...morePokemons]);
      setCount(count + 12);
    } catch (error) {
      // Lide com o erro, se necessário.
    }
  };


  useEffect(() => {
    async function fetchPokemons() {
      try {
        const data = await getPokemons(count);
        setPokemons(data);
        setLoading(false);
      } catch (error) {
        setError("Houve um erro ao exibir os pokemons, tente novamente mais tarde.")
      }
    }

    fetchPokemons();
  }, [count]);


  const handleSearch = (searchResults) => {
    if(searchResults.length > 0){
      setPokemons(searchResults);
      setError('');
      setIsVisible(false)
    }else{
      setError("Pokemon não encontrado na base de dados.")
      setPokemons(searchResults);
    }
  };

  const handleTypeSearch = (type) => {
    setPokemons(type)
  }

  return (
    <>
      {isMobile ? (
          <Banner img={banner_home_mobile} title="banner pokedex"></Banner>
      ) : (
        <Banner img={banner_home} title="banner pokedex"></Banner>
      )}
     
      <div className="container">
        <div className="form">
          <Search onSearch={handleSearch} onError={setError}> </Search>
        </div>
        <FilterTypes onFilter={handleTypeSearch}></FilterTypes>
        <div className="page-title">
          <h1 className="title"> Pokémons </h1>
        </div>

        <div className="list-pokemons">
             {error && <p>{error}</p>}
             {!error && loading ? (
               <Loader></Loader>
             ) : (

              <>
              {pokemons.map((pokemon) => (
                <CardPokemon key={pokemon.id} data={pokemon} />
              ))}
              </>
              
             )}
        </div>
      
      {isVisible && 
        <div className="container btn-show-more">
          <button onClick={loadMorePokemons}>Mostrar Mais</button>
        </div>
      } 
      </div>
    </>

    
  )
}

export default Home