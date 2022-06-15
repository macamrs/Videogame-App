import React from 'react'
import { useState } from 'react'
import './Pagination.css'

export default function Pagination({gamesPerPage, totalGames, paginate}) {
    const [actual, setActual] = useState(1)
    const pageNumbers = []

    // if index is less or equal to the total games divided by the gamesperoPage
    for(let i=1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
        pageNumbers.push(i)
    }

    function handlePrev(e) {
        e.preventDefault();
        if(actual === 1) {
            paginate(1)
        } else {
            paginate(actual - 1)
            setActual(actual - 1)
        }
    }

    function handleNext(e) {
        e.preventDefault();
        if(actual === pageNumbers.length) {
            paginate(pageNumbers.length)
        } else {
            paginate(actual + 1)
            setActual(actual + 1)
        }
    }

    return (     
        <div>
            <div className='page_container'>
                <div>
                    <button className='btn' onClick={e => handlePrev(e)}>Previous</button>
                </div>
            {pageNumbers?.map(number => {
                return (<li key={number}>
                    <button className='btn_paginate' value={number} onClick={() => paginate(number)}>{number}</button>
                </li>)
            })}
                <div>
                    <button className='btn' onClick={e => handleNext(e)}>Next</button>
                </div>
            </div>
        </div>
    )
}