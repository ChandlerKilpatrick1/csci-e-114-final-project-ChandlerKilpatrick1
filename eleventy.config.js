module.exports = function(eleventyConfig) {
    eleventyConfig.addCollection("random_pokemon", require("./src/_data/random_pokemon.js"));

    eleventyConfig.addPassthroughCopy("src/assets/**");
    
    return {
    dir: {
        input: "src",
        output: "dist"
    }
    };
};