const axios = require('axios')
const { API_KEY } = process.env;
const { Genre } = require('../db')

async function getPlatforms (req, res) {
    try {
        let platformApi = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`);
        let apiInfo = platformApi.data.results;
        const platforms = apiInfo.map(e => e.name)
        res.send(platforms)
    } catch (error) {
        res.status(404).send('Platform not found')
    }
}

module.exports = {
    getPlatforms
}