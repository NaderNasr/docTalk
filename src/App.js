import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import PokemonList from './components/PokemonList';

const App = () => {
  const [pokeDetails, setPokeDetails] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLocal, setIsLocal] = useState(true)

  const url = `https://pokeapi.co/api/v2/pokemon`
  const localUrl = `http://localhost:4000/api`

  const pokeResult = (pokemons) => {
    return Promise.all(pokemons.map(async (pokemon, i) => {
      let index = i + 1;
      try {
        const res = await axios.get(`${url}/${index}`);
        setPokeDetails(current => [{
          name: pokemon.name,
          img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`,
          types: res.data.types.map(t => t.type.name)
        }, ...current]);
      } catch (err) {
        return console.info(err.message);
      }
    }));
  }

  const getUrl = async (url) => {
    await axios.get(url)
      .then(res => pokeResult(res.data.results))
  }

  useEffect(() => {
    if (!isLocal) {
      setPokeDetails([])
      getUrl(url)
      console.clear()
      console.log('PokeAPI', pokeDetails)
      setIsLoading(false)
    } else {
      setPokeDetails([])
      getUrl(localUrl)
      console.clear()
      console.log('Express DB', pokeDetails)
      setIsLoading(false)
    }
  }, [isLocal]);

  // console.log(isLocal)
  return (

    <div>
      <h1>PokeDex</h1>
      <h3>Rendering: {isLocal ? 'Express DB' : 'Poke API'}</h3>
      <button onClick={() => setIsLocal(!isLocal)} style={{ marginBottom: '20px' }}>
        Get {!isLocal ? 'Express DB' : 'Poke API'}
      </button>
      <p>{`Number of Pokemon cards from ${!isLocal ? 'Express DB' : 'Poke API'}: ${pokeDetails.length} `}</p>
      <div className='all-container'>
        {(isLoading || pokeDetails.length <= 0) ?
          <p>Loading...</p>
          :
          <span>{pokeDetails?.map((poke, id) =>
            <>
              <PokemonList
                key={id}
                poke={poke}
              />
            </>
          )}
          </span>
        }
      </div>
    </div>
  );
}

export default App;
