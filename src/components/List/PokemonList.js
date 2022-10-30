import React from 'react';

const PokemonList = ({ poke, isLocal, savePoke }) => {

  const uppercaseWords = str => str.replace(/^(.)|\s+(.)/g, firstLetter => firstLetter.toUpperCase());

  const id = poke?.name
  return (
    <div className="app-contaner">
      <table>
        <tbody>
          <tr key={id}>
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