// const fetch = require('node-fetch');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.handler = async function(event, context) {
  const baseUrl = `https://dog.ceo/api/breeds/image/random`;

  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Error fetching dog image" })
      };
    }
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ imageUrl: data.message })
    };
  } catch (error) {
    // output to netlify function log
    console.error("Error fetching dog image:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error fetching dog image" })
    };
  }
};