import React from 'react';
import { NavLink } from 'react-router-dom';

export default function LaunchScreen() {
    return (
        <div>
            <h1>This is the LaunchScreen</h1>
            <NavLink to='./home'>
                <button>Go!</button>
            </NavLink>
        </div>
    )
}