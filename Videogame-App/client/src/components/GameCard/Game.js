import React from 'react'
import './Game.css'
import { Link } from 'react-router-dom'
import star from '../../images/icons8-rating-32.png'

export default function Game({id, name, image, genres, rating, vg_created_db}) {

    return (
        <div className='card_game'>
            <Link className='link' to={`/details/${id}`} key={parseInt(id)} >
                <h2 className='title'>{name}</h2>
                <img src={image} width='300px' alt='#'/>
                    <div className='info'>
                        <div className='rating-container'>
                            <img alt='star' src={star} /><p className='rating'>{rating}</p>                              
                        </div>
                        <div className='genres_container'>
                            {genres?.map(e => {
                                return <p className='genres' key={e}>{e}</p>
                            })}                    
                        </div>  
                    </div>      
            </Link>                                     
        </div>         
    )
}