import React from 'react';

const PokemonList = ({ poke, isLocal, savePoke }) => {

  const uppercaseWords = str => str.replace(/^(.)|\s+(.)/g, firstLetter => firstLetter.toUpperCase());
  return (
    <div className="app-contaner">
      <table>
        <tbody>
          <tr>
            <td><img className='detail-image' src={poke?.img} alt='pokemon' /></td>
            <td>{uppercaseWords(poke?.name)}</td>
            <td>
              {poke?.types?.forEach((type, id) => (
                <div>
                  <div style={{marginbottom:'10px'}}>{type}</div>
                </div>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
      {isLocal &&
        <button
          onClick={() => savePoke(poke?.name, poke?.img, poke?.types)}
          className='button save'
        >
          Save
        </button>}
    </div>
  )
}

export default PokemonList