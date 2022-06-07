const axios = require('axios')
const { API_KEY } = process.env;
const { Videogame, Genre } = require('../db')
const { gamesDB } = require('./vgControl')
const { Op } = require('sequelize')

// http://localhost:3001/videogame
const createVideoGame = async(req, res, next) => {
        const { name, released, description, rating, platforms, image, genre, vg_created_db } = req.body;
       
        const newGame = await Videogame.create({
            name, 
            description, 
            released,
            rating,
            image,
            platforms,
            vg_created_db
        })

        // console.log(genre)
        genre.forEach(async (g) => {
            let genreDb = await Genre.findAll({ 
                where: {
                    name : g
                }
            })
           await newGame.addGenre(genreDb); 
        })
        // console.log(newGame)
        return res.status(201).send(newGame) // retornar juego creado
        // return res.status(200).send('Videogame created)           
}

// http://localhost:3001/videogame/3498
const gameDetail = async (req, res) => {
  const { id } = req.params;
//   console.log(id.length)

      try{
        // Lo busco en la api
        if(id.length < 10) {
          let game = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
          let gameData = game.data;

          if(gameData){
              return res.send({ 
                  id: gameData.id, 
                  name: gameData.name,
                  description: gameData.description_raw,
                  released: gameData.released,
                  rating: gameData.rating,
                  platforms: gameData.platforms.map(p => p.platform.name),
                  genre: gameData.genres.map(g => g.name),
                  image: gameData.background_image
              });
          }

        } else if(id.length == 36) {
        // Lo busco en bd
            let gameSearch = await gamesDB();
            let gameFinal = await gameSearch.find(f => f.id == id);
            return res.send(gameFinal)
    }

    } catch(error){
        console.log("Game not found")
    }
};

module.exports = {
    createVideoGame,
    gameDetail,
}