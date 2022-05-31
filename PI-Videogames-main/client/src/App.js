import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import VideoGames from './components/VideoGames'
import Screen from './components/Screen';
import GameDetails from './components/GameDetails';
import GameForm from './components/GameForm'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<Screen />} />
            <Route path='/home' element={<VideoGames />} />      
            <Route path='/details/:id' element={<GameDetails />} />    
            <Route path='/creategame' element={<GameForm />} /> 
        </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;