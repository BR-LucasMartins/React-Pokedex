import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFetchPokemons } from '../../hooks/useFetchPokemons';


function CardEvolutions({id}) {

    const [pokemon, setPokemon] = useState(null);
    const { getPokemonById } = useFetchPokemons;

    useEffect(() => {
        async function fetchPokemon() {
          try {
            const data = await getPokemonById(id);
            setPokemon(data);
          } catch (error) {
            setPokemon(null)
          }
        }
    
        fetchPokemon();
      }, [id]);
    

    function formatNumberID(number , decimal){
        const numeroString = number.toString();
        const zerosFaltando = decimal - numeroString.length;
        if (zerosFaltando > 0) {
            return '0'.repeat(zerosFaltando) + numeroString;
        }
        return numeroString;
    }

    function handleScrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };
    

    var types = 1;

    if(pokemon){
        types = pokemon.types.split(',');
    } 

    return (
        <Link onClick={handleScrollToTop} to={`/pokemons/${id}`} className='card-evolution'>
            <div className="card-evolution-image">
                <img src={pokemon ? pokemon.thumb : ''} alt="thumb" />
            </div>
            <div className='card-evolution-content-information'>
            <div className="card-evolution-content-information-name">
                <span className='pokemon-id'> {formatNumberID(id, 3)}  </span>
                <span className='pokemon-name'> {pokemon ? pokemon.name : 'Loading...'} </span>
            </div>
            <div className="card-evolution-content-information-types">
                <ul className='types'>
                   {pokemon ? (
                    types.map((type , index)=>(
                        <li key={index} className={`type type_${type}`}>
                        {type.trim()}
                    </li>
                   ))
                   ) : (
                    ''
                   )}
                </ul>
            </div>
            </div>
            
        </Link>
    )
}

export default CardEvolutions