const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1000';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const pokemonList = data.results;
    const randomPokemon = pokemonList[Math.floor(Math.random() * pokemonList.length)];
    const pokemonName = randomPokemon.name;

    const imageUrl = `https://img.pokemondb.net/artwork/large/${pokemonName}.jpg`;

    return {
      statusCode: 200,
      body: JSON.stringify({
        name: pokemonName,
        imageUrl: imageUrl
      })
    };

  } catch (error) {
    // output to netlify function log
    console.error("Error fetching pokemon image:", error);
    return { statusCode: 422, body: String(error) };
  }
};