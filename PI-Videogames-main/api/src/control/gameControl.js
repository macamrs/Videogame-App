const axios = require('axios')
const { API_KEY } = process.env;
const { Videogame, Genre } = require('../db')

// http://localhost:3001/videogame
async function createVideoGame (req, res, next) {
        const { name, launch_date, description, rating, platforms, image, genre } = req.body;

        try {
            const newGame = await Videogame.create({
                name, 
                description, 
                launch_date,
                rating,
                image,
                platforms
            })

            const gameDb = await Genre.findAll({ where: {name : genre}})
            newGame.addGenre(gameDb);

            return res.status(201).send('New game created')  
            
        } catch (error) {
            console.log(error)
        }              
}

// http://localhost:3001/videogame/3498
async function gameDetail(req, res) {
    const { id } = req.params;

    try{
        if(isNaN(id)) {
            let gameDB = await Videogame.findByPk(id, { 
                include: {
                    model: Genre,
                    attributes: ["name"]
                }
            })
            return gameDB;
        }

    } catch(error){
        return res.json("Game not in data base") 
    }

    try{
        let game = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        let gameData = game.data;

        if(gameData){
            return res.send({ 
                id: gameData.id, 
                name: gameData.name,
                description: gameData.description_raw,
                date: gameData.released,
                rating: gameData.rating,
                platforms: gameData.platforms.map(p => p.platform.name),
                genre: gameData.genres.map(g => g.name),
                img: gameData.background_image
            });
        }

    } catch(error){
        console.log("Game not found")
    }

}

async function gameDeleted (req, res) {
    const { id } = req.params;
    try {
        let game = await Videogame.findByPk(id);
        if(game) {
            await Videogame.destroy({where: { id: id}})
            res.send('Videogame deleted')            
        } else {
            res.send('Videogame not found') 
        }
    }
     catch (error) {
        console.log(error)
    }
}

module.exports = {
    createVideoGame,
    gameDetail,
    gameDeleted
}