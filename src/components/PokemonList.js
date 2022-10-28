import React from 'react';
import { Table } from 'react-bootstrap';

const PokemonList = ({ poke }) => {

  const uppercaseWords = str => str.replace(/^(.)|\s+(.)/g, firstLetter => firstLetter.toUpperCase());
  return (
    <div className="app-contaner">
      <table>
        <tbody>
          <tr key={poke.name}>
            <td><img className='detail-image' src={poke?.img} alt='pokemon' /></td>
            <td>{uppercaseWords(poke?.name)}</td>
            <td>
              {poke?.types?.map((type, id) => (
                <>
                  <span key={id}>{type}</span> <br /><br />
                </>
              ))}
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  )
}

export default PokemonList