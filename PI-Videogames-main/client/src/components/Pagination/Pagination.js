import React from 'react'
import './Pagination.css'

export default function Pagination({gamesPerPage, totalGames, paginate}) {
    const pageNumbers = []

    // if index is less or equal to the total games divided by the gamesperoPage
    for(let i=1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
        pageNumbers.push(i)
    }

    return (     
        <div>
            <div className='page_container'>
            {pageNumbers?.map(number => {
                return (<li key={number}>
                    <button className='btn_paginate' value={number} onClick={() => paginate(number)}>{number}</button>
                </li>)
            })}
            </div>
        </div>
    )
}