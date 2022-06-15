import { 
    GET_VIDEOGAMES, //
    GET_VIDEOGAMES_BY_ID, //
    SEARCH_GAME, //
    GET_ALL_GENRES, //
    GET_PLATFORMS, //
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
                ...state,
                videogames: action.payload,
                gamesCopy : action.payload
            }

        case GET_VIDEOGAMES_BY_ID:
            return {
                ...state,
                gameDetail : action.payload
            }

        case GET_ALL_GENRES:
            return {
                ...state,
                genres: action.payload
            }                
         
        case GET_PLATFORMS:
            return {
                ...state,
                platforms: action.payload
            }   

        case SEARCH_GAME:
            return {
                ...state,
                videogames : action.payload
            }  
            
        case SORT_BY_ALPHABET:
            let gamesA = state.gamesCopy

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
                ...state,
                videogames : gamesOrderAlpha
            }  

        case SORT_BY_RATING:
            let gamesR = state.gamesCopy

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
                ...state,
                videogames : gamesOrderRating
            } 

        case SORT_BY_ORIGIN:
            let gameOrigin = state.gamesCopy

            const originFilter = action.payload === 'created' ? gameOrigin.filter(c => c.vg_created_db === true) : gameOrigin.filter(e => !e.vg_created_db)

            return {
                ...state,
                videogames : action.payload === 'all' ? gameOrigin : originFilter
            }    

        case SORT_BY_GENRE:
            let genreGame = state.gamesCopy

            const genreFilter = action.payload === 'all' ? genreGame 
            : genreGame.filter(g => g.genre?.includes(action.payload))

            return {
                ...state,
                videogames: genreFilter
            }

        default: 
            return state;
    }
}