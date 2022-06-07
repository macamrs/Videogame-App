const axios = require('axios')
const { API_KEY } = process.env;
const { Genre } = require('../db')

const getGenres = async (req, res) => {
    try {
        let genreApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        let apiInfo = genreApi.data.results;
        // console.log(apiInfo)
        let genres = apiInfo.map(e => e.name)
        // console.log(genres)

        //Put in db
        genres.forEach(element => {
            Genre.findOrCreate({
                where: { 
                    name : element
                }
            })
        })

        const allGenres = await Genre.findAll()
        return res.send(allGenres)

    } catch (error) {
        res.status(404).send('Genre not found')
    }
}

module.exports = {
    getGenres
}