const axios = require("axios");
require('dotenv').config();
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db");
// &page_size=100 para limitar juegos tomados 
// GET all games(from data base also)
// http://localhost:3001/videogames
// http://localhost:3001/videogames/red-dead-redemption-undead-nightmare

const gameAPI = async() => {
    try {
      let array = [];
      for (let i = 1; i < 6; i++) {
        const gamesByPage = await axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);
        const gameResults = gamesByPage.data.results;
        array = array.concat(gameResults);
      }
  
      const gamesAPI = array.map(g => {  
        return {
            id: g.id,
            name: g.name,
            image: g.background_image,
            rating: g.rating,
            genre: g.genres.map(g => g.name),
            released: g.released,
            platforms: g.platforms.map(p => p.platform.name)
        };
      });
      return gamesAPI
    } catch (error) {
      console.log(error); 
    }
  };
  
const gamesDB = async() => {
    const gameDB = await Videogame.findAll({
        include: {
          model: Genre,
          attributes: ["name"],
          through: {
            attribute: []
          }
      }
    });

    return gameDB;  
};
  
const getAllVideoGames = async(req, res) => {
  const { name } = req.query;

  const infoDB = await gamesDB();
  const infoAPI = await gameAPI();
  const allGames = infoDB.concat(infoAPI) //[...dataDb, ...dataApi];
  // Primero me traigo los juegos de las base de datos

  // Search by name
  if(name) {
    let gameByName = await axios.get(`https://api.rawg.io/api/games?search={${name}}&key=${API_KEY}`);

    let queryData = gameByName.data.results.map(g => {
      return {        
        id: g.id,
        name: g.name,
        image: g.background_image,
        rating: g.rating,
        genre: g.genres.map(g => g.name),
        released: g.released,
        platforms: g.platforms.map(p => p.platform.name)
      }
    })
    // console.log(queryData)
    // allGames.filter(g => g.name.toLowerCase().includes(name.toLowerCase()));
    
    if (!queryData.length) {
      return res.send('Game not in Data Base')
    } else if(queryData.length > 15) {
      queryData = queryData.slice(0, 15)
      // console.log(queryData)
      return res.send(queryData);
    } else {

      return res.send(queryData)
    }  
  }

  return res.status(200).send(allGames);
};


module.exports = {
    getAllVideoGames,
    gamesDB
}