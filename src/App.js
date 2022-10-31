import { useEffect, useState } from 'react';
import axios from 'axios'
import PokemonList from './components/List/PokemonList';
import Nav from './components/NavBar/Nav';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  // const savePoke = async (id, image, types) => {

  //   const savedPoke = {
  //     name: id,
  //     img: image,
  //     types: types.map((type) => type)
  //   }

  //   const result = await fetch(`${localUrl}`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(savedPoke)
  //   })
  //   const resultInJson = await result.json()
  //   setPokeDetails(prev => [resultInJson,...prev])
  // };


  const savePoke = async (id, image, types) => {

    const savedPoke = {
      name: id,
      img: image,
      types: types.map((type) => type)
    }

    await axios.post(`${localUrl}`, savedPoke)
      .then(res => {
        setPokeDetails(prev => [res.data, ...prev])
      })
  };

  useEffect(() => {
    if (!isLocal) {
      setPokeDetails([])
      getUrl(url)
      setIsLoading(false)
    } else {
      setPokeDetails([])
      getUrl(localUrl)
      setIsLoading(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLocal]);



  return (
    <div>
      <div className='nav'>
        <Nav isLocal={isLocal} pokeDetails={pokeDetails} setIsLocal={setIsLocal} />
      </div>
      <div className='all-container header'>
        {(isLoading || pokeDetails.length <= 0) ?
          <h3 className='loading'>Loading...</h3>
          :
          <div className='app'>
            <table className='table-header'>
              <tbody>
                <tr className='row-header'>
                  <td>Image</td>
                  <td>Name</td>
                  <td>Types</td>
                </tr>
              </tbody>
            </table>
            <span>{pokeDetails?.map((poke, id) =>
              <PokemonList
                key={id}
                index={id}
                poke={poke}
                isLocal={isLocal}
                savePoke={savePoke}
              />
            )}
            </span>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
