import axios from 'axios'

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES'
export const GET_ALL_GENRES = 'GET_ALL_GENRES'
export const GET_VIDEOGAMES_BY_ID = 'GET_VIDEOGAMES_BY_ID'
export const GET_PLATFORMS = 'GET_PLATFORMS'
export const DELETE_GAME = 'DELETE_GAME'
export const SEARCH_GAME = 'SEARCH_GAME'
export const SORT_BY_ALPHABET = 'SORT_BY_ALPHABET'
export const SORT_BY_RATING = 'SORT_BY_RATING'
export const SORT_BY_PLATFORMS = 'SORT_BY_PLATFORMS'
export const SORT_BY_ORIGIN = 'SORT_BY_ORIGIN'
export const SORT_BY_GENRE = 'SORT_BY_GENRE'

// GET ALL GAMES
export function getVideoGames() {
    return async function(dispatch) {
        return await axios.get('http://localhost:3001/videogames')
        .then((vg) => { return dispatch({
            type: GET_VIDEOGAMES,
            payload: vg.data
        })})
        .catch((error) => {
            console.log(error)
        })
    }
}

// GET ALL GENRES
export function getAllGenres() {
    return async function(dispatch) {
        return await axios.get('http://localhost:3001/genres')
        .then((g) => {return dispatch({
            type: GET_ALL_GENRES,
            payload: g.data
        })})
        .catch((error) => {
            console.log(error)
        })
    }
}

// GET GAME BY ID
export function getGameByID(id) {
    return async function(dispatch) {
        return await axios.get(`http://localhost:3001/videogame/${id}`)
        .then((vg) => dispatch({
            type: GET_VIDEOGAMES_BY_ID,
            payload: vg.data
        }))
        .catch((error) => {
            console.log(error)
        })
    }
}

// GET PLATFORMS
export function getPlatforms() {
    return async function(dispatch) {
        return axios.get('http://localhost:3001/platforms')
        .then(p => {
            return dispatch({
                type: GET_PLATFORMS,
                payload: p.data
            })
        })
        .catch(error => {
            console.log(error)
        })
    }
}

// CREATE GAME BY ID
export function postVideoGame(game) {
    return async function(dispatch) {
        // const gameCreated = await axios.post('http://localhost:3001/videogame', game)
        // return {
        //     type: POST_VIDEOGAME,
        //     payload: gameCreated            
        // }
        let gameID = await axios.post('http://localhost:3001/videogame', game);
        return gameID;     
    }   
}

// DELETE GAME
export function deleteVideoGame(game) {
    return async function(dispatch) {
        await axios.delete(`http://localhost:3001/videogame/${game}`)
        .then((d) => { return dispatch({
                type: DELETE_GAME,
                payload: d.data            
        })})
        .catch((error) => {
            console.log(error)
        })
    }
}

// SEARCH GAME BY NAME
export function searchGame(search) {
    return function(dispatch) {
        axios.get(`http://localhost:3001/videogames?name=${search}`)
        .then((game) => {
            return dispatch({
                type: SEARCH_GAME,
                payload: game.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

// SORT
export const sortByAlphabet = (name) => ({
    type: SORT_BY_ALPHABET,
    payload: name
});

export const sortByRating = (rating) => ({
    type: SORT_BY_RATING,
    payload: rating
})

export const sortByPlatforms = (platforms) => ({
    type: SORT_BY_PLATFORMS,
    payload : platforms
})

export const sortByOrigin = (game) => ({
    type: SORT_BY_ORIGIN,
    payload: game
})

export const sortByGenre = (genre) => ({
    type: SORT_BY_GENRE,
    payload: genre
})