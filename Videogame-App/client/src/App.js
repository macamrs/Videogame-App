import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import VideoGames from './components/Videogames/VideoGames'
import Screen from './components/LandingPage/Screen';
import GameDetails from './components/GameDetails/GameDetails';
import Form from './components/GameForm/Form'
import Error from './components/Error/Error'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<Screen />} />
            <Route path='/home' element={<VideoGames />} />      
            <Route path='/details/:id' element={<GameDetails />} />    
            <Route path='/creategame' element={<Form />} /> 
            <Route element={<Error />} /> 
        </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;