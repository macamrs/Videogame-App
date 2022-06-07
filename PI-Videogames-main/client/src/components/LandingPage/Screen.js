import React from 'react'
import './Screen.css'
import { Link } from 'react-router-dom'
import logo from '../../images/logo-no-bg.svg'

export default function Screen() {
    return (
        <div className='screen_container is-loading'>
            <div className='main_container'>
                <img alt='#' src={logo} />
                {/* <h1 className='title_main'>Henry VideoGames</h1> */}
                <Link to='/home'>
                <button className='btn_main'>Home Page</button>
                </Link>                
            </div>
        </div>
    )
}