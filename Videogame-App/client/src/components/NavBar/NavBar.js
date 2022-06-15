import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'
import logo from '../../images/logo-no-bg.svg'

export default function NavBar() {

    // RESET BTN
    function handleReset(e) {
        e.preventDefault();
        window.location.reload(false)
    }

    return (
        <div>
            <div className='nav_container'>
                <Link className='link logo' to='/'>
                    <img alt='logo' src={logo} />
                </Link>
                <Link className='link link-hover' onChange={e => handleReset(e)} to='/home'>All Games</Link>
                <Link className='link link-hover' to='/creategame'>Create Game</Link>         
            </div>
            <div className='wave'></div>    
        </div>

    )
}