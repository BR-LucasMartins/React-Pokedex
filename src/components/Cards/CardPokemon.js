import React from 'react';
import { Link } from 'react-router-dom';


function CardPokemon({data}) {

    function formatNumberID(number , decimal){
        const numeroString = number.toString();
        const zerosFaltando = decimal - numeroString.length;
        if (zerosFaltando > 0) {
            return '0'.repeat(zerosFaltando) + numeroString;
        }
        return numeroString;
    }

    const types = data.types.split(',');

    return (
         <div className="card-pokemon-wrapper">
            <Link to={`/pokemons/${data.id}`} className='card-pokemon'>
                <div className="card-pokemon-header">
                    <img src={data.thumb} alt={data.name} />
                </div>
                <div className="card-pokemon-body">
                    <span> {formatNumberID(data.id, 3)} </span>
                    <h2> {data.name} </h2>
                </div>
                <div className="card-pokemon-footer">
                    <ul className='types'>
                        {types.map((type , index)=> 
                            <li key={index} className={`type type_${type}`}>
                                {type.trim()}
                            </li>
                        )}
                    </ul>
                </div>
            </Link>
        </div>

    )
}

export default CardPokemon