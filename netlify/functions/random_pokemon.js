
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

import fetch from 'node-fetch';
exports.handler = async function(event, context) {
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1000';

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: "Error fetching pokemon list" })
      };
    }
    const data = await response.json();
    const pokemonList = data.results;
    const randomPokemon = pokemonList[Math.floor(Math.random() * pokemonList.length)];
    const pokemonName = randomPokemon.name;
    const imageUrl = `https://img.pokemondb.net/artwork/large/${pokemonName}.jpg`;

    return {
      statusCode: 200,
      body: JSON.stringify({ name: pokemonName, imageUrl: imageUrl })
    };
  } catch (error) {
    console.error("Error fetching pokemon image:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error fetching pokemon image" })
    };
  }
};