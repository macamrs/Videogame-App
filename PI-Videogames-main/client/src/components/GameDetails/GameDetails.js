import React, { useEffect }  from'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import { getGameByID } from '../../store/actions/actions'
import './GameDetails.css'

export default function GameDetails() {

    let {id} = useParams();
    let dispatch = useDispatch();
    let gameDetail = useSelector((state) => state.gameDetail)

    useEffect(() => {
        dispatch(getGameByID(id))
    },[dispatch])

    return (
        <div>
            <NavBar />
                <div className='card-container'>

                    <h1>{gameDetail.name}</h1>
                    
                    <div className='main_content'>
                        <img src={gameDetail.image} alt='#'/>
                        <div className='info_content'>

                            <div className='rating'>
                                <h3>Rating</h3>
                                <p>{gameDetail.rating}</p>  
                            </div>

                            <div className='genres'>
                                <h3>Genres</h3>
                                {gameDetail.genre?.map(g => {
                                    return <p key={g} >{g}</p>
                                })}                                 
                            </div>

                           <div className='description'>
                           <h3>Description</h3>
                                <p>{gameDetail.description}</p>
                           </div>

                            <div className='released'>
                            <h3>Released Date</h3>
                                <p>{gameDetail.released}</p>    
                            </div>
                            
                            <div className='platforms'>
                                <h3>Platforms</h3>
                                {gameDetail.platforms?.map(p => {
                                    return <p key={p} >{p}</p>
                                })}                                
                            </div>                                               
                        </div>
                    </div>
                </div>                
        </div>            
    )
}