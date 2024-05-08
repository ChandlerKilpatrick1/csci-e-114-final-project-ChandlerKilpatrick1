// const eleventyFetch = require("@11ty/eleventy-fetch");

// module.exports = async function() {
//   const baseUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1000';
//   try {
//     const response = await eleventyFetch(baseUrl, {
//       duration: '1d', 
//       type: 'json'
//     });

//     const pokemonList = response.results;
//     const randomPokemon = pokemonList[Math.floor(Math.random() * pokemonList.length)];
//     const pokemonName = randomPokemon.name;

//     // Construct the image URL
//     const imageUrl = `https://img.pokemondb.net/artwork/large/${pokemonName}.jpg`;

//     return {
//       name: pokemonName,
//       imageUrl: imageUrl
//     };
//   } catch (error) {
//     console.error('Error fetching the list of Pokémon:', error);
//     return {};
//   }
// };