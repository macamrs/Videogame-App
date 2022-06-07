import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'
import logo from '../../images/logo-no-bg.svg'

export default function NavBar() {
    return (
        <div>
            <div className='nav_container'>
                <Link className='link logo' to='/'>
                    <img alt='logo' src={logo} />
                </Link>
                <Link className='link link-hover' to='/home'>All Games</Link>
                <Link className='link link-hover' to='/creategame'>Create Game</Link>         
            </div>
            <div className='wave'></div>    
        </div>

    )
}