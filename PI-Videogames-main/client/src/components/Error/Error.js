import React from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
    return (
        <div>
            <h1>Something went wrong</h1>
            <Link to='/home'>
                <button>Go to main page</button>
            </Link>
        </div>
    )
}