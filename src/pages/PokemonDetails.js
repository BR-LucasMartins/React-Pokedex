import React, { useState , useEffect } from 'react'
import { useParams, Link } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useMediaQuery } from '@mui/material';
import { useFetchPokemons } from '../hooks/useFetchPokemons';

//images
import bg_circle from '../assets/images/resources/pokemon_circle_bg.png';
import bg_rotate from '../assets/images/resources/pokemon_bg.png';
import evolution_arrow from '../assets/images/resources/arrow_down.png';
import CardEvolutions from '../components/Cards/CardEvolutions';

function PokemonDetails() {
    const isMobile = useMediaQuery('(max-width: 992px)');
    const [pokemon, setPokemon] = useState(null);
    const [prevPokemon, setPrevPokemon] = useState(null);
    const [nextPokemon, setNextPokemon] = useState(null);
    const { id } = useParams(); // Use o parâmetro de ID da URL.
    const { getPokemonById } = useFetchPokemons;
  
    useEffect(() => {
        async function fetchPokemon() {
          try {
            const data = await getPokemonById(id);
            setPokemon(data);
      
            // Verifique se o objeto pokemon não é null antes de acessar a propriedade id.
            if (data) {
              const currentId = parseInt(id, 10);
      
              if (currentId > 0 && currentId <= 494) {
                const prevId = currentId - 1;
                const nextId = currentId + 1;
      
                console.log(prevId);
      
                try {
                  const prevData = await getPokemonById(prevId);
                  setPrevPokemon(prevData);
                } catch (error) {
                  // Não encontrou um Pokémon anterior.
                  setPrevPokemon(null);
                }
      
                try {
                  const nextData = await getPokemonById(nextId);
                  setNextPokemon(nextData);
                } catch (error) {
                  // Não encontrou um Pokémon seguinte.
                  setNextPokemon(null);
                }
              } else {
                console.log('ID não encontrado');
              }
            } else {
              console.log('Dados do Pokémon não encontrados');
            }
          } catch (error) {
            // Lide com o erro, se necessário.
          }
        }
      
        fetchPokemon();
      }, [id]);
  
    if (!pokemon) {
      return <p>Carregando...</p>;
    }

    function formatNumberID(number , decimal){
        const numeroString = number.toString();
        const zerosFaltando = decimal - numeroString.length;
        if (zerosFaltando > 0) {
            return '0'.repeat(zerosFaltando) + numeroString;
        }
        return numeroString;
    }

    const types = pokemon.types.split(',');
    const weakness = pokemon.weaknesses.split(',');
    const abilities = pokemon.abilities.split(',');
    const evolutions = pokemon.evolution_chain;

    return (
        <section className='pokemon-detail'>
            {/* Header inforations */}
            <div className="pokemon-detail-header">
                <div className="pokemon-detail-header-content">
                    <div className={`pokemon-prev ${prevPokemon ? '' : 'd-none'  }`}>
                        <div className="arrow-left">
                            <Link to={`/pokemons/${prevPokemon ? prevPokemon.id : ''}`} className='icon'>
                                <FaAngleLeft></FaAngleLeft>
                            </Link>
                        </div>
                        <div className="pokemon-prev-name">
                            <span className='prev-id'> {formatNumberID(prevPokemon ? prevPokemon.id : '', 3)} </span>
                            <span className='prev-name'> {prevPokemon ? prevPokemon.name : ''} </span>
                        </div>
                    </div>

                    <div className="pokemon-id">
                        <p className='pokemon-number-id'> {formatNumberID(pokemon.id, 3)} </p>
                        <h1 className='pokemon-name'> {pokemon.name} </h1>
                    </div>
                    <div className="pokemon-next">
                        <div className="arrow-right">
                            <div className="arrow-left">
                                <Link to={`/pokemons/${nextPokemon ? nextPokemon.id : ''}`} className='icon'>
                                    <FaAngleRight></FaAngleRight>
                                </Link>
                            </div>
                        </div>
                        <div className="pokemon-next-name">
                            <span className='next-id'> {formatNumberID(nextPokemon ? nextPokemon.id : '', 3)} </span>
                            <span className='next-name'> {nextPokemon ? nextPokemon.name : ''} </span>
                        </div>
                    </div>
                </div>
                <div className="pokemon-id-mobile">
                    <span className='pokemon-id-mobile__number-id'> {pokemon.id} </span>
                    <span className='pokemon-id-mobile__name'> {pokemon.name} </span>
                </div>
            </div>

            <div className="pokemon-detail-main">
                <div className="pokemon-detail-main__center">
                    <div className="pokemon-image">
                        <img className='pokemon-thumbnail' src={pokemon.thumb} alt={`thumb ${pokemon.name}`}/>
                        <img className='bg-circle' src={bg_circle} alt="blue noon behind pokemon" />
                        <img className='bg-rotate' src={bg_rotate} alt="spiral" />
                    </div>
                </div>

                <div className="pokemon-detail-main__informations">
                    <div className="pokemon-informations-content">
                        <div className="pokemon-informations-content-types">
                             <h2> Type </h2>
                            <ul className='types'>
                                {types.map((type , index)=>(
                                     <li key={index} className={`type type_${type}`}>
                                     {type.trim()}
                                 </li>
                                ))}
                            </ul>
                        </div>
                        <div className="weakness">
                        <h2> Weakness </h2>
                            <ul className='types'>
                            {weakness.map((type , index)=>(
                                     <li key={index} className={`type type_${type}`}>
                                     {type.trim()}
                                 </li>
                                ))}
                            </ul>
                        </div>
                        
                        {isMobile ? ( '') : (
                        <div className="pokemon-informations-content-version">
                            <h2> Version </h2>
                            <p className='description'> {pokemon.description} </p>
                        </div>
                          )}
                    </div>

                    <div className="pokemon-informations-content">
                        <div className="pokemon-informations-content-skills">
                            <div className="atributes">
                                <div className="atributes-wrapper">
                                    <span> Height </span>
                                    <p> {pokemon.height} m</p>
                                </div>

                                <div className="atributes-wrapper">
                                    <span> Weight </span>
                                    <p> {pokemon.weight/10} kg</p>
                                </div>

                                <div className="atributes-wrapper">
                                    <span> Region </span>
                                    <p> {pokemon.region}</p>
                                </div>
                            </div>
                            <div className="skills">
                                <span> Ability </span>
                                <ul>
                                {abilities.map((skill , index)=>(
                                     <li key={index}>
                                     {skill.trim()}
                                 </li>
                                ))}
                                </ul>
                            </div>
                        </div>
                        <div className="pokemon-informations-content-status">
                            <h2> Status </h2>
                            <ul>
                                <li>
                                    <span className='label'> HP </span>
                                    <span className='value'> {pokemon.hp}</span>
                                </li>
                                <li>
                                    <span className='label'> Attack </span>
                                    <span className='value'> {pokemon.attack}</span>
                                </li>
                                <li>
                                    <span className='label'> Defense </span>
                                    <span className='value'> {pokemon.defense} </span>
                                </li>
                                <li>
                                    <span className='label'> Special Atk </span>
                                    <span className='value'> {pokemon.special_attack}</span>
                                </li>
                                <li>
                                    <span className='label'> Special Def </span>
                                    <span className='value'> {pokemon.special_defense}</span>
                                </li>
                                <li>
                                    <span className='label'> Speed </span>
                                    <span className='value'> {pokemon.speed}</span>
                                </li>
                            </ul>
                            <ul className='total'>
                                <li>
                                    <span className='label'> Total </span>
                                    <span className='value'> {pokemon.hp + pokemon.attack + pokemon.defense + pokemon.special_attack + pokemon.special_defense + pokemon.speed} </span>
                                </li>
                            </ul>
                        </div>

                        {isMobile ? ( 
                            <div className="pokemon-informations-content-version">
                            <h2> Version </h2>
                            <p className='description'> {pokemon.description} </p>
                        </div>
                        ) : (
                                ''
                          )}
                    </div>
                </div>


            </div>


            <div className="pokemon-detail-evolutions">
                <h2> Evolutions </h2>
                <div className="pokemon-detail-evolutions-wrapper">
                { evolutions.length > 0 ? ( 
                    evolutions.map((e, index) => (
                        <React.Fragment key={index}>
                        <div className='card-content'>
                        <CardEvolutions id={e.id}></CardEvolutions>
                        {e.variations && e.variations.length > 0 ? <span className='variation'> OR </span> : ''}
                        {e.variations && e.variations.length > 0 ? 
                            e.variations.map((variation, vIndex) => (
                                <CardEvolutions key={vIndex} id={variation.id}></CardEvolutions>     
                            ))
                         : 
                         null
                         }
                        </div>
                        {index == (evolutions.length -1 ) ? (
                            ''
                        ) : (
                            <img className='next-evolution-arrow' src={evolution_arrow} alt="icon arrow" />
                        )
                        }
                        </React.Fragment>
                    ))
                    
                ) : (
                    <p> This Pokémon does not evolve. </p>
                )}
                </div>
               
            </div>

        </section>
    )
}

export default PokemonDetails