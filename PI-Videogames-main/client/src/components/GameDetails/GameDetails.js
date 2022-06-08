import React, { useEffect }  from'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import { getGameByID } from '../../store/actions/actions'
import './GameDetails.css'
import { Link } from 'react-router-dom'

export default function GameDetails() {
    let {id} = useParams();
    let dispatch = useDispatch();
    let gameDetail = useSelector((state) => state.gameDetail)
    // console.log(gameDetail)

    useEffect(() => {
        dispatch(getGameByID(id))
    },[])

    return (
        <div>
            <NavBar />
        {       
            gameDetail.id ?    
                <div className='card-container'>

            <div className='name_back'>
                <Link className='link' to='/home'>
                    <button className='btn_back'>Go back</button> 
                </Link>

                    <h1>{gameDetail.name}</h1>
            </div>
                    <div className='main_content'>
                        <img src={gameDetail.image} alt='#'/>
                        <div className='info_content'>

                            <div className='rating'>
                                <h3>Rating</h3>
                                <p>{gameDetail.rating}</p>  
                            </div>

                            <div className='genres'>
                                <h3>Genres</h3>
                                { gameDetail.vg_created_db === true ? gameDetail.genres.map(e => {
                                    return <p key={e.id}>{e.name}</p>
                                }) :
                                gameDetail.genre?.map(g => {
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
              : console.log('ID not found')
            }            
        </div>            
    )
}