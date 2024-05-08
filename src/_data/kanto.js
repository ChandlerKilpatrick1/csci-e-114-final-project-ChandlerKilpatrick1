
const eleventyFetch = require("@11ty/eleventy-fetch");

async function fetchPokemonDetails(url) {
  try {
    const response = await eleventyFetch(url, {
      duration: '1d', 
      type: 'json',
      fetchOptions: {
        headers: {
          'user-agent':  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        },
      },
    });
    const growthRate = response.growth_rate ? response.growth_rate.name : 'unknown';
    const baseHappiness = response.base_happiness;
    const colorName = response.color ? response.color.name : 'unknown';
    const habitat = response.habitat ? response.habitat.name : 'unknown';

    const flavorTextEntry = response.flavor_text_entries.find(entry => entry.language.name === "en");
    const flavorText = flavorTextEntry ? flavorTextEntry.flavor_text : 'No description available';

    // const formDescriptions = response.form_descriptions.map(fd => fd.description).join(' ');

    return {
      response,
      growthRate,
      baseHappiness,
      colorName,
      habitat,
      flavorText
      // formDescriptions

    }

  } catch (error) {
    console.error(`Error fetching details for URL: ${url}`, error);
    return null;
  }
}

module.exports = async function () {
  const baseUrl = 'https://pokeapi.co/api/v2/pokedex/2';

  try {
    const pokemonData = await eleventyFetch(baseUrl, {
      duration: '1d',
      type: 'json',
      fetchOptions: {
        headers: {
          'user-agent':  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        },
      },
    });

    const detailedPokemonEntries = await Promise.all(
      pokemonData.pokemon_entries.map(async (entry) => {
        const details = await fetchPokemonDetails(entry.pokemon_species.url);
        // console.log(details); 
        return {
          entry_number: entry.entry_number,
          name: entry.pokemon_species.name,
          url: entry.pokemon_species.url,
          details,
        };
      })
    );

    return detailedPokemonEntries;
  } catch (error) {
    console.error(`Something went wrong with the request to ${baseUrl}`, error);
    return [];
  }
};