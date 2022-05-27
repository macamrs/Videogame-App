const axios = require('axios')
const { API_KEY } = process.env;
const { Genre } = require('../db')

async function getGenres (req, res) {
    try {
        let genreApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        let apiInfo = genreApi.data.results;
        const genres = apiInfo.map(e => e.name)

        genres.map(async element => {
            return await Genre.findOrCreate({
                where: { name : element}
            })
        })

        const allGenres = await Genre.findAll()
        res.send(allGenres)

    } catch (error) {
        res.status(404).send('Genre not found')
    }
}

module.exports = {
    getGenres
}