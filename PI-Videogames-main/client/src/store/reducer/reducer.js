import { 
    GET_VIDEOGAMES, //
    GET_VIDEOGAMES_BY_ID, //
    SEARCH_GAME, //
    GET_ALL_GENRES, //
    GET_PLATFORMS, //
    DELETE_GAME, //
    SORT_BY_ALPHABET, //
    SORT_BY_RATING, //
    SORT_BY_ORIGIN, //
    SORT_BY_GENRE, //
} from "../actions/actions";

const initialState = {
    videogames: [], 
    gameDetail: {}, 
    gamesCopy: [], 
    genres: [],  
    platforms: [],    
}

export default function reducer( state = initialState, action) {
    switch(action.type) {
        case GET_VIDEOGAMES:
            return {
                ...initialState,
                videogames: action.payload,
                gameCopy : action.payload
            }

        case GET_VIDEOGAMES_BY_ID:
            return {
                ...initialState,
                gameDetail : action.payload
            }

        case GET_ALL_GENRES:
            return {
                ...initialState,
                genres: action.payload
            }             
            
        case DELETE_GAME:
            return {
                ...initialState,
                gameDetail: action.payload
            }     
         
        case GET_PLATFORMS:
            return {
                ...initialState,
                platforms: action.payload
            }   

        case SEARCH_GAME:
            return {
                ...initialState,
                videogames : action.payload
            }  
            
        case SORT_BY_ALPHABET:
            let gamesA = state.videogames

            const gamesOrderAlpha = action.payload === 'ascendent' ? gamesA.sort((a, b) => {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                else return 0; 
            }) : gamesA.sort((a, b) => {
                if (a.name > b.name) return -1;
                if (a.name < b.name) return 1;
                else return 0;                 
            });

            return {
                ...initialState,
                videogames : gamesOrderAlpha
            }  

        case SORT_BY_RATING:
            let gamesR = state.videogames

            const gamesOrderRating = action.payload === 'ascendent' ? gamesR.sort((a, b) => {
                if (a.rating < b.rating) return 1;
                if (a.rating > b.rating) return -1;
                else return 0; 
            }) : gamesR.sort((a, b) => {
                if (a.rating < b.rating) return -1;
                if (a.rating > b.rating) return 1;
                else return 0;                 
            });

            return {
                ...initialState,
                videogames : gamesOrderRating
            } 

        case SORT_BY_ORIGIN:
            let gameOrigin = state.gamesCopy

            const originFilter = action.payload === 'created' ? gameOrigin.filter(c => c.vg_created_db) : gameOrigin.filter(e => !e.vg_created_db)

            return {
                ...initialState,
                videogames : action.payload === 'all' ? state.videogames : originFilter.length ? originFilter : console.log('Game not found')
            }    

        case SORT_BY_GENRE:
            let genreGame = state.gamesCopy

            const genreFilter = action.payload === 'all' ? genreGame 
            : genreGame.filter(g => g.genres?.includes(action.payload))

            return {
                ...initialState,
                videogames: genreFilter
            }

        default: 
        return state;
    }
}