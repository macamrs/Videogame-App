const axios = require('axios')

function getAllVideoGames (req, res, next) {
    try {
        let videogames = (await axios('https://api.rawg.io/api/games')).data.results
        res.send(videogames)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllVideoGames
}