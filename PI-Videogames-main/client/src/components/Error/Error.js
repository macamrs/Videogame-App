import React from 'react'
import { Link } from 'react-router-dom'
import notfound from '../../images/not-found.jpg'

export default function Error() {
    <div>
        <img alt='error' src={notfound} />
        <Link to='/'>Go to main page</Link>
    </div>
}