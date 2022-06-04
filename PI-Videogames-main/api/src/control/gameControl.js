const axios = require('axios')
const { API_KEY } = process.env;
const { Videogame, Genre } = require('../db')

// http://localhost:3001/videogame/3498
const gameDetail = async (req, res) => {
  const { id } = req.params;

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

        } else {

        // Lo busco en bd
        let gameDB = await Videogame.findOne({
            where : {id: id},
            include: {
                model: Genre,
                attributes: ['name'],
                through:{
                    attributes:[],
                }
            }
        })
    
        gameDB.genres = gameDB.genres.map(e => e.name)
       
        return res.send({
            id: gameDB.id,
            name: gameDB.name,
            image: gameDB.image,
            description: gameDB.description,
            platforms: gameDB.platforms ,
            released: gameDB.released,
            rating: gameDB.rating,
            genre: gameDB.genre
        })    
    }

    } catch(error){
        console.log("Game not found")
    }
};

// http://localhost:3001/videogame
const createVideoGame = async(req, res, next) => {
        const { name, released, description, rating, platforms, image, genre, vg_created_db } = req.body;

        try {
            const newGame = await Videogame.create({
                name, 
                description, 
                released,
                rating,
                image,
                platforms,
                vg_created_db
            })

            const genreDb = await Genre.findAll({ 
                where: {
                    name : genre
                }
            })

            newGame.addGenre(genreDb);

            return res.status(201).send(newGame) // retornar juego creado
            // return res.status(200).send('Videogame created)
        } catch (error) {
            console.log(error)
        }              
}

const gameDeleted = async(req, res) => {
  const { id } = req.params;
  try {
      let game = await Videogame.findByPk(id);

      if(game) {
          await Videogame.destroy( {where: { id: id}} )
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