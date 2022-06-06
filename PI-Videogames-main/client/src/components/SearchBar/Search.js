import React, {useEffect} from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import './Search.css'
import { searchGame } from '../../store/actions/actions'

export default function Search() {
    let dispatch = useDispatch()

    const [search, setSearch] = useState('');

    // SEARCH BAR
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(searchGame(search));
        setSearch('')
    }

    function handleInputChange(e) {
        e.preventDefault();
        setSearch(e.target.value);
    }

    return (
        <div className='container'>
                {/* SEARCH INPUT */}
                <form className='searchbar_form' onSubmit={handleSubmit}>
                    <div className='searchbar-all'>
                        <input 
                        placeholder='Search Game' 
                        type='text' 
                        onChange={handleInputChange} 
                        value={search} />    
                        <div className='search-btn'>
                            <button type='submit'>🔎</button>   
                            <span></span>                          
                        </div>          
                    </div>
                </form>          
        </div>

    )
}