import React, { useState, useEffect } from 'react'
import { postVideoGame, getAllGenres, getPlatforms } from '../../store/actions/actions'
import './GameForm.css';
import NavBar from '../NavBar/NavBar'
import { useDispatch, useSelector } from 'react-redux'

export default function GameForm() {
    const dispatch = useDispatch()
    let allGenres = useSelector((state) => state.genres)
    let allPlatforms = useSelector((state) => state.platforms)
    // console.log(allPlatforms)

    useEffect(() => {
        dispatch(getAllGenres())
    }, [])

    useEffect(() => {
        dispatch(getPlatforms())
    }, [])    

    // Store form values
    const [input, setInput] = useState({
        name: '',
        description: '',
        released: '',
        rating: '',
        image: '',
        platforms: [],
        genre: []
    }) 
    
    // Validation
    const [error, setError] = useState({
        name: '',
        rating: '',
        platforms: '',
        genre: '',
        description: '',
        image: ''
    })   

    function validateInput(input) {
       let errors = {};   
       
        if(!input.name || /[$%&|<>#]/.test(input.name)) {
            errors.name = 'Name input needs to be complete and without special characters'

        } else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(input.image)) {
            errors.image = 'Invalid image. Try another one'

        } else if(!input.rating || input.rating < 0 || input.rating > 5) {
            errors.rating = 'Rating is required'

        } else if(!input.platforms.length) {
            error.platforms = 'Choose at least one option'

        } else if(!input.genre.length) {
            error.genre = 'Choose at least one option'

        } 

        return errors;
    }

    function handleInputChange(e) {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name] : e.target.value,
        })
        setError(validateInput({
            ...input,
            [e.target.name] : e.target.value,
        }))
    };

    function handleGenre(e) {
        if(e.target.checked){
            setInput({
                ...input,
                genre: [...input.genre, e.target.value]
            })
            e.target.value = '';
        } else if(!e.target.checked) {
            setInput({
                ...input,
                genre : [...input.genre.filter(g => g !== e.target.value)]
            })
        }
    }

    function handlePlatforms(e) {
        if(e.target.checked){
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            })
            e.target.value = '';
        } else if(!e.target.checked) {
            setInput({
                ...input,
                platforms : [...input.platforms.filter(g => g !== e.target.value)]
            })            
        }
    }   

    function handleSubmit(e){
        e.preventDefault();
        if(!input.name && !input.description && !input.platforms && !input.genre){
            alert('Please complete all fields before creating your game') 

        } else { 
            dispatch(postVideoGame(input))
            alert('Game created successfully') 
            setError('')
            setInput({
                name: '',
                description: '',
                released: '',
                rating: '',
                image: '',
                platforms: [],
                genre: [],            
            })                     
        } 
    }

  return (
    <div className='form_container'>
       
            <NavBar />
    
        <form onSubmit={e => handleSubmit(e)} className='form_section'>
            <h1>Create your own Game!</h1>

            {/* NAME INPUT */}
            <div className='areas_form'>
                <label>Name</label>
                <input 
                    value={input.name} 
                    name='name' 
                    placeholder='Game name' 
                    type='text' 
                    onChange={e => handleInputChange(e)} />
            </div>
            {error.name && (<p>{error.name}</p>)}  

            {/* DESCRIPTION INPUT */}
            <div className='areas_form'>
                <label>Description</label>
                <textarea 
                    cols='100'
                    rows='10'
                    value={input.description} 
                    name='description' 
                    placeholder='About the game' 
                    type='text' 
                    onChange={e => handleInputChange(e)} />       
            </div>
            {error.description && (<p>{error.description}</p>)} 

            {/* DATE INPUT */}
            <div className='areas_form'>
                <label>Release Date</label>
                <input 
                    value={input.released} 
                    name='released' 
                    type='text' 
                    placeholder='YY-MM-DD' 
                    onChange={e => handleInputChange(e)} />        
            </div>

            {/* IMAGE INPUT */}
            <div className='areas_form'>
                <label>Select an image</label>
                    <input 
                        value={input.image} 
                        name='image' 
                        type='url' 
                        placeholder='Image URL' 
                        onChange={e => handleInputChange(e)} /> 
                <small>(This input only works with an URL.)</small>                            
            </div>
            {error.image && (<p>{error.image}</p>)}

            {/* RATING INPUT */}
            <div className='areas_form'>
                <label>Rating</label>
                <input 
                    value={input.rating} 
                    name='rating' 
                    type='number' 
                    min='0' max='5' 
                    placeholder='Between 0 - 5' 
                    onChange={e => handleInputChange(e)} />
            </div>
            {error.rating && (<p>{error.rating}</p>)} 

            <div className='checkbox_section'>
                {/* GENRE INPUT */}
                <label>Genres</label>
                <div className='genres_container'>
                        {allGenres.map((el, i) => {
                            return <div className='input_checkbox' key={i}>
                                <input 
                                type="checkbox" 
                                name='genre' 
                                key={i} 
                                value={el.name} 
                                onChange={g => handleGenre(g)}/>
                                <span name='genre'>{el.name}</span>
                            </div>
                        })}                                      
                </div>
                {error.genre && (<p>{error.genre}</p>)}

                {/* PLATFORM INPUT */}
                <label>Platforms</label>
                <div className='platforms_container'>
                    {allPlatforms.map((el, i)=> {
                        return <div className='input_checkbox' key={el}>
                                <input 
                                type="checkbox" 
                                name='platforms' 
                                key={i} 
                                value={el} 
                                onChange={p => handlePlatforms(p)} />  
                                <span name='platforms'>{el}</span>                                 
                            </div>
                    })}     
                </div>                       
                {error.platforms && (<p>{error.platforms}</p>)}
            </div>

            {/* DISPLAY INPUTS */}
            <div className='input_display'>
                <label>Image: {/* <span>{input.image}</span> */}</label>  
                {input.image ? <img width='250em' height='250em' alt='input image' src={input.image} /> : <span></span> }                  
                <label>Name: <span>{input.name}</span></label>
                <label>Description: <span>{input.description}</span></label>
                <label>Release Date: <span>{input.launch_date}</span></label>          
                <label>Rating: <span>{input.rating}</span></label>
                <label>Genres: <span>{input.genre}</span></label>
                <label>Platforms: <span>{input.platforms}</span></label>    
            </div>
  
            <button className='submit_btn' type='submit'>Create game!</button>
        </form>
    </div>
  );
}

// [ ] Posibilidad de seleccionar/agregar varias plataformas
// https://media.wired.com/photos/5b899992404e112d2df1e94e/master/pass/trash2-01.jpg
// https://i.pinimg.com/originals/9a/9c/d4/9a9cd49c3955de935c6c931611b599fb.jpg