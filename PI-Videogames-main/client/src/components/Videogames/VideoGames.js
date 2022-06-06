import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
    getVideoGames,
    getAllGenres, 
    sortByGenre, 
    sortByOrigin, 
    sortByRating, 
    sortByAlphabet  } from '../../store/actions/actions'
import Game from '../GameCard/Game'
import NavBar from '../NavBar/NavBar.js'
import Search from '../SearchBar/Search'
import Pagination from '../Pagination/Pagination'
import './VideoGames.css'

export default function VideoGames() {
    let dispatch = useDispatch();
    let allGames = useSelector((state) => state.videogames)
    let allGenres = useSelector((state) => state.genres)

    useEffect(() => {
        dispatch(getVideoGames())        
    }, [])   

    useEffect(() => {
        dispatch(getAllGenres())        
    }, []) 
    
    // Estado para filtros
    const [order, setOrder] = useState('')

    // Estado para paginate
    const [currentPage, setCurrentPage] = useState(1)
    const [gamesPerPage, setGamesPerPage] = useState(15)

    
    // CURRENT GAME
    const indexOfLastGame = currentPage * gamesPerPage;

    const indexOfFirstGame = indexOfLastGame - gamesPerPage;

    const currentGame = allGames.slice(indexOfFirstGame, indexOfLastGame);
    
    // CHANGE PAGE
    const paginate = (pageNumber) => setCurrentPage(pageNumber);     
    
        // SORT ALPH
        function handleSortAlp(e) {
            e.preventDefault();
            dispatch(sortByAlphabet(e.target.value))
            setOrder(e.target.value)
            setCurrentPage(1);
        }
    
        // SORT RATING
        function handleSortRating(e) {
            e.preventDefault();
            dispatch(sortByRating(e.target.value))
            setOrder(e.target.value)
            setCurrentPage(1);
        }
    
        // ORDER ORIGIN
        function handleFilterOrigin(e) {
            e.preventDefault();
            dispatch(sortByOrigin(e.target.value))
            setOrder(e.target.value)
            setCurrentPage(1);
        }
    
        // ORDER GENRE
        function handleFilterGenre(e) {
            e.preventDefault();
            dispatch(sortByGenre(e.target.value))
            // setOrder(e.target.value)
            setCurrentPage(1);
        }
  
    return (
        <div>
            <NavBar />
            <Search />   

            <div className='filter_container'>

               {/* ORDER ALPHABETICALLY */}  
                <select name='sortA' onChange={e => handleSortAlp(e)}>
                    <option value='ascendent'>A - Z</option>
                    <option value='descendent'>Z - A</option>
                </select>

                {/* ORDER BY RATING */}
                <select name='rating' onChange={e => handleSortRating(e)}>
                    <option value='ascendent'>Top rated</option>
                    <option value='descendent'>Worst rated</option>
                </select>

                {/* ORDER BY ORIGIN */}
                <select name='origin' onChange={e => handleFilterOrigin(e)}>
                    <option value='all'>All games</option>
                    <option value='created'>My games</option>
                </select>

                {/* FILTER BY GENRE */}
                <select name='genres' onChange={e => handleFilterGenre(e)}>
                    <option value='all'>All Genres</option>
                    {allGenres?.map((el) => { 
                        return <option key={el.id} value={el.name}>{el.name}</option>})}
                </select>                 
            </div>
            
            {/* ALL GAMES */}
            <div className='grid_games'>
            {currentGame.length ? currentGame.map(game => {
                    return (
                    <Game
                        key={game.id}
                        id={game.id}
                        name={game.name}
                        image={game.image}
                        genres={game.genre}
                        rating={game.rating}
                        />)
                }) : console.log('loading')  
            }
            </div>

            {/* PAGINATION SECTION */}
            <Pagination 
                gamesPerPage={gamesPerPage} 
                totalGames={allGames.length} 
                paginate={paginate}/>

        </div>
    )
}