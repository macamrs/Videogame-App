import React from 'react';
import {BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import './App.css';

// Container
import CreateGame from './components/CreateGame'
import GameDetails from './components/GameDetails'
import LaunchScreen from './components/LaunchScreen'
import Main from './components/Main'

function App() {
  return (
    <div className="App">
      <h1>Henry Videogames</h1>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' component={LaunchScreen}/>
          <Route path='/home' component={Main}/>
          <Route path='/creategame' component={CreateGame}/>
          <Route path='/videogame/:id' component={GameDetails}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;