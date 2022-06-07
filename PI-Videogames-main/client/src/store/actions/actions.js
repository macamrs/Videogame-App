import axios from 'axios'
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES'
export const GET_VIDEOGAMES_BY_ID = 'GET_VIDEOGAMES_BY_ID'
export const SEARCH_GAME = 'SEARCH_GAME'
export const GET_ALL_GENRES = 'GET_ALL_GENRES'
export const GET_PLATFORMS = 'GET_PLATFORMS'
export const DELETE_GAME = 'DELETE_GAME'
export const SORT_BY_ALPHABET = 'SORT_BY_ALPHABET'
export const SORT_BY_RATING = 'SORT_BY_RATING'
export const SORT_BY_ORIGIN = 'SORT_BY_ORIGIN'
export const SORT_BY_GENRE = 'SORT_BY_GENRE'

// GET ALL GAMES
export function getVideoGames() {
    return async function(dispatch) {
        return await axios.get('http://localhost:3001/videogames')
        .then((games) =>  dispatch({
            type: GET_VIDEOGAMES,
            payload: games.data
        }))
        .catch((error) => {
            console.log(error)
        })
    }
}

// GET GAME BY ID
export function getGameByID(id) {
    return async function(dispatch) {
        return await axios.get(`http://localhost:3001/videogame/${id}`)
        .then((detail) => dispatch({
            type: GET_VIDEOGAMES_BY_ID,
            payload: detail.data                
        }))
        .catch((error) => {
           console.log(error) 
        })
    }
}

// SEARCH GAME BY NAME
export function searchGame(search) {
    return async function(dispatch) {
        return await axios.get(`http://localhost:3001/videogames?name=${search}`)
        .then((game) => dispatch({
            type: SEARCH_GAME,
            payload: game.data            
        }))         
        .catch((error) => {
            console.log(error)
        })
    }
}

// CREATE GAME BY ID
export function postVideoGame(game) {
    return async function(dispatch) {
        let gameID = await axios.post('http://localhost:3001/videogame', game);
        return gameID;     
    }   
}

// GET ALL GENRES
export function getAllGenres() {
    return async function(dispatch) {
        return await axios.get('http://localhost:3001/genres')
        .then((g) => dispatch({
            type: GET_ALL_GENRES,
            payload: g.data                
        }))
        .catch((error) => {
            console.log(error)
        })
    }
}
 
// GET PLATFORMS
export function getPlatforms() {
    return async function(dispatch) {
        return await axios.get('http://localhost:3001/platforms')
            .then((platform) => dispatch({
                type: GET_PLATFORMS,
                payload: platform.data            
            }))            
            .catch ((error) => {
                console.log(error)
            })
    }
}

// // DELETE GAME
export function deleteVideoGame(id) {
    return async function(dispatch) {
        return await axios.delete(`http://localhost:3001/videogame/${id}`)
        .then((trash) => dispatch({
            type: DELETE_GAME,
            payload: trash.data            
        }))
        .catch((error) => {
            console.log(error)
        })
    }
}

// SORT
export const sortByAlphabet = (payload) => {
    return {
        type: SORT_BY_ALPHABET,
        payload        
    }
}

export const sortByRating = (payload) => {
    return {
        type: SORT_BY_RATING,
        payload        
    }
}

export const sortByOrigin = (payload) => {
    return {
        type: SORT_BY_ORIGIN,
        payload 
    }

}

export const sortByGenre = (payload) => {
    return {
        type: SORT_BY_GENRE,
        payload        
    }
}