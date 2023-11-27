import { useState } from 'react';
import { useFetchPokemons } from '../hooks/useFetchPokemons';
import { FaFilter, FaRedo } from "react-icons/fa";

//icons types
import bug from '../assets/images/filter-types/bug.gif';
import dark from '../assets/images/filter-types/dark.gif';
import dragon from '../assets/images/filter-types/dragon.gif';
import electric from '../assets/images/filter-types/electric.gif';
import fairy from '../assets/images/filter-types/fairy.gif';
import fighting from '../assets/images/filter-types/fighting.gif';
import fire from '../assets/images/filter-types/fire.gif';
import flying from '../assets/images/filter-types/flying.gif';
import ghost from '../assets/images/filter-types/ghost.gif';
import grass from '../assets/images/filter-types/grass.gif';
import ground from '../assets/images/filter-types/ground.gif';
import ice from '../assets/images/filter-types/ice.gif';
import normal from '../assets/images/filter-types/normal.gif';
import poison from '../assets/images/filter-types/poison.gif';
import psychic from '../assets/images/filter-types/psychic.gif';
import rock from '../assets/images/filter-types/rock.gif';
import steel from '../assets/images/filter-types/steel.gif';
import water from '../assets/images/filter-types/water.gif';

function FilterTypes({onFilter}) {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const { filterPokemons } = useFetchPokemons;

    const openModal = () => {
        setIsOpen(true);
        document.body.classList.add('modal-open');
    }

    const closeModal = () => {
        setIsOpen(false);
        document.body.classList.remove('modal-open');
    }

    const clearFilter = () => {
        window.location.reload();
        closeModal();
      };


    const handleTypeSearch = (type) => {

        setSelectedType(type);
        (async () => {
            try {
              const filterResults = await filterPokemons(type);
              console.log(filterResults)
              onFilter(filterResults);
              
            } catch (error) {
              console.error('Erro ao buscar Pokémon:', error);
            }
          })();
        
        closeModal();
    }

  return (
    <div>
        <div className='filter-types-pokemon' onClick={openModal}> 
            <FaFilter></FaFilter> 
            <span> Filtrar </span>
        </div>

        {isOpen && (
        <div className="modal">
            <div className="modal-dialog">
            <button className='x' onClick={closeModal}> ❌ </button>
            <h2>Selecione um tipo:</h2>
            <div className="types-list">
                <div className="type-button"  onClick={() => handleTypeSearch('bug')}>
                    <img src={bug} alt="icon type bug" />
                    <p> Bug </p>
                </div>
                <div className="type-button"  onClick={() => handleTypeSearch('dark')}>
                    <img src={dark} alt="icon type dark" />
                    <p> Dark </p>
                </div>
                <div className="type-button"  onClick={() => handleTypeSearch('dragon')}>
                    <img src={dragon} alt="icon type dragon" />
                    <p> Bug </p>
                </div>
                <div className="type-button"  onClick={() => handleTypeSearch('electric')}>
                    <img src={electric} alt="icon type electric" />
                    <p> Electric </p>
                </div>
                <div className="type-button"  onClick={() => handleTypeSearch('fairy')}>
                    <img src={fairy} alt="icon type fairy" />
                    <p> Fairy </p>
                </div>
                <div className="type-button"  onClick={() => handleTypeSearch('fighting')}>
                    <img src={fighting} alt="icon type fighting" />
                    <p> Fighting </p>
                </div>
                <div className="type-button"  onClick={() => handleTypeSearch('fire')}>
                    <img src={fire} alt="icon type fire" />
                    <p> Fire </p>
                </div>
                <div className="type-button"  onClick={() => handleTypeSearch('flying')}>
                    <img src={flying} alt="icon type flying" />
                    <p> Flying </p>
                </div>
                <div className="type-button"  onClick={() => handleTypeSearch('ghost')}>
                    <img src={ghost} alt="icon type ghost" />
                    <p> Ghost </p>
                </div>
                <div className="type-button"  onClick={() => handleTypeSearch('grass')}>
                    <img src={grass} alt="icon type grass" />
                    <p> Grass </p>
                </div>
                <div className="type-button"  onClick={() => handleTypeSearch('ground')}>
                    <img src={ground} alt="icon type ground" />
                    <p> Ground </p>
                </div>
                <div className="type-button"  onClick={() => handleTypeSearch('ice')}>
                    <img src={ice} alt="icon type ice" />
                    <p> Ice </p>
                </div>
                <div className="type-button"  onClick={() => handleTypeSearch('normal')}>
                    <img src={normal} alt="icon type normal" />
                    <p> Normal </p>
                </div>
                <div className="type-button"  onClick={() => handleTypeSearch('poison')}>
                    <img src={poison} alt="icon type poison" />
                    <p> Poison </p>
                </div>
                <div className="type-button"  onClick={() => handleTypeSearch('psychic')}>
                    <img src={psychic} alt="icon type psychic" />
                    <p> Psychic </p>
                </div>
                <div className="type-button"  onClick={() => handleTypeSearch('rock')}>
                    <img src={rock} alt="icon type rock" />
                    <p> Rock </p>
                </div>
                <div className="type-button"  onClick={() => handleTypeSearch('steel')}>
                    <img src={steel} alt="icon type steel" />
                    <p> Steel </p>
                </div>
                <div className="type-button"  onClick={() => handleTypeSearch('water')}>
                    <img src={water} alt="icon type water" />
                    <p> Water </p>
                </div>
            </div>
            <div className="modal-dialog-footer">
                <button className='clean-filter'  onClick={clearFilter}>
                    <FaRedo></FaRedo>
                    <span> Limpar </span>
                </button>
            </div>
         </div>
        </div>
            
        )}
    </div>
  )
}

export default FilterTypes