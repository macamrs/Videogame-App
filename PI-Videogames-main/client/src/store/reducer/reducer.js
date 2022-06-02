import { 
    GET_VIDEOGAMES, //
    GET_VIDEOGAMES_BY_ID, //
    SEARCH_GAME, //
    SORT_BY_ALPHABET,
    SORT_BY_RATING,
    SORT_BY_PLATFORMS,
    SORT_BY_ORIGIN,
    GET_ALL_GENRES, //
    DELETE_GAME, //
    GET_PLATFORMS //
} from "../actions/actions";

const initialState = {
    videogames: [],
    gameCopy: [],
    genres: [],
    vgID: [],
    vgDB: [],
    platforms: []
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
                vgID : action.payload
            }

        case GET_ALL_GENRES:
            return {
                ...initialState,
                genres: action.payload
            }             
            
        case DELETE_GAME:
            return {
                ...initialState,
                vgDB: action.payload
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
            const gamesOrderAlpha = () => {
                if(action.payload === 'ascendent') {
                    gamesA.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
                } else {
                    gamesA.sort((a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0))
                }
            }
            return {
                ...initialState,
                videogames : gamesOrderAlpha
            }  

        case SORT_BY_RATING:
            let gamesR = state.videogames 
            const gamesOrderRating = () => {
                if(action.payload === 'ascendent') {
                    gamesR.sort((a, b) => (a.rating > b.rating ? 1 : a.rating < b.rating ? -1 : 0))
                } else {
                    gamesR.sort((a, b) => (a.rating > b.rating ? -1 : a.rating < b.rating ? 1 : 0))
                }
            }           
            return {
                ...initialState,
                videogames : gamesOrderRating
            }  

        case SORT_BY_PLATFORMS:
            return {
                ...initialState,
                videogames : action.payload
            } 
             
        case SORT_BY_ORIGIN:
            return {
                ...initialState,
                videogames : action.payload
            }              
            

        default: 
        return state;
    }
}