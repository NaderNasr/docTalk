const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 4000;

app.listen(port);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const pokeResult = (pokemons) => {
  return Promise.all(pokemons?.map((pokemon, i) => {
    let index = i + 1;
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${index}`)
      .then(res => {
        return {
          name: pokemon?.name,
          img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`,
          types: res?.data?.types?.map(t => t.type.name)
        }
      })
      .catch(err => console.log(err))
  }));
}

app.get("/api/:id", (req, res) => {
  const { id } = req.params;
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(axios => {
      return res.send({
        name: axios?.data?.name,
        img: axios?.data?.sprites?.front_default,
        types: axios?.data?.types?.map(t => t.type.name)
      })
      .catch( err => console.log(err))
    })
})


app.get("/api", (req, res) => {
  axios
  .get("https://pokeapi.co/api/v2/pokemon")
  .then((axios) => {
      const pokemons = axios.data.results
      return pokeResult(pokemons);
    }).then(processedPokemons => {
      res.send({ results: processedPokemons })
    })
    .catch((error) => {
      console.error(error);
    });
  });

  app.post('/api', (req, res) => {
    const post = req.body;
    res.send(post);
  });


console.log(`App listening on port: ${port}`)