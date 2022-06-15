import React, { useState, useEffect} from 'react';
import {Formulario, Label, Titulo, Boton, MensajeExito, MensajeError, ContainerCheckbox} from './Styled';
import Input from './Input';
import { postVideoGame, getAllGenres, getPlatforms } from '../../store/actions/actions'
import NavBar from '../NavBar/NavBar'
import { useDispatch, useSelector } from 'react-redux'

function validate(input) {
	let problem = {};

	if(!input.platforms) {
		problem.platforms = 'Select at least one platform'
	} else {
		problem.platforms = ''
	}

	if(!input.genre) {
		problem.genre = 'Select at least one genre'
		problem.genre = ''
	} 

	return problem;
}

export default function Form() {
    const dispatch = useDispatch()
    let allGenres = useSelector((state) => state.genres)
    let allPlatforms = useSelector((state) => state.platforms)

    useEffect(() => {
        dispatch(getAllGenres())
    }, [])

    useEffect(() => {
        dispatch(getPlatforms())
    }, [])  

    const [name, setName] = useState({value: '', valid: null})
    const [description, setDescription] = useState({value: '', valid: null})
    const [released, setReleased] = useState({value: '', valid: null})
    const [rating, setRating] = useState({value: '', valid: null})
    const [image, setImage] = useState({value: '', valid: null})
    const [platforms, setPlatforms] = useState({platforms: []})
    const [genre, setGenre] = useState({genre: []})
    const [validForm, setValidForm] = useState(null)
	const [errors, setErrors] = useState({
		genre: '',
		platforms: ''
	})

    function handlePlatforms(e) {
        if(e.target.checked){
            setPlatforms({
                ...platforms,
                platforms: [...platforms.platforms, e.target.value],
            })
			setErrors(validate({
                ...platforms,
                platforms: [...platforms.platforms, e.target.value],
			}))

        } else if(!e.target.checked) {
            setPlatforms({
                ...platforms,
                platforms : [...platforms.platforms.filter(g => g !== e.target.value)],
            })           
        }
    }

    function handleGenre(e) {
        if(e.target.checked){
            setGenre({
                ...genre,
                genre: [...genre.genre, e.target.value],
            })
			setErrors(validate({
                ...genre,
                genre: [...genre.genre.filter(g => g !== e.target.value)],
			}))

        } else {
            setGenre({
                ...genre,
                genre : [...genre.genre.filter(g => g !== e.target.value)]
            })
        }
    }

	const expresiones = {
		name: /^[a-zA-Z0-9 :]{1,100}$/,
		description: /^[a-zA-ZÀ-ÿ\s]{4,700}$/,
		released: /^\d{4}\-\d{2}\-\d{2}$/,
		rating: /^[0-5]{1}$/,
		image: /^(ftp|http|https):\/\/[^ "]+$/,
	}

	const onSubmit = (e) => {
		e.preventDefault();

		let input = {
			name: name.value, 
            description: description.value, 
            released: released.value,
            rating: rating.value,
            image: image.value,
            platforms: platforms.platforms,
			genre: genre.genre
		}

		if(
			name.valid === 'true' &&
			description.valid === 'true' &&
			released.valid === 'true' &&
			rating.valid === 'true' &&
			image.valid === 'true' &&
			platforms.platforms &&
            genre.genre 
            ){
			setValidForm(true);
			setErrors({genre: '', platforms: ''})
            dispatch(postVideoGame(input))
			setDescription({value: '', valid: ''});
			setName({value: '', valid: null});
			setReleased({value: '', valid: null});
			setRating({value: '', valid: null});
			setImage({value: '', valid: null});
			setPlatforms({value: '', valid: null});
            setGenre({value: '', valid: null}); 
		} else {
			setValidForm(false);
		}
	}

	return (
		<main>
            <NavBar />
			<Formulario action="" onSubmit={onSubmit}>
            <Titulo>Create your own Game!</Titulo>
				<Input
					state={name}
					changedState={setName}
					type="text"
					label="Name"
					placeholder='Game name'
					name="name"
					error='Name input needs to be complete and without special characters'
					expresionRegular={expresiones.name}
				/>

				<Input
					state={description}
					changedState={setDescription}
					type="text"
					label="Description"
					placeholder='About the game'
					name="description"
					error='Description is too short' 
					expresionRegular={expresiones.description}
				/>

				<Input
					state={released}
					changedState={setReleased}
					type="text"
					label="Released Date"
                    placeholder='YYYY-MM-DD'
					name="released"
					error='Released date is required' 
					expresionRegular={expresiones.released}
				/>

				<Input
					state={rating}
					changedState={setRating}
					type="number"
					label="Rating"
					name="rating"
                    placeholder='Between 0 - 5'
					error='Rating is required'
                    expresionRegular={expresiones.rating}
				/>

				<Input
					state={image}
					changedState={setImage}
					type="url"
					label="Image"
					placeholder="Image URL"
					name="image"
					error='Invalid image. Try another one'
					expresionRegular={expresiones.image}
				/>  

                <ContainerCheckbox>
                    <Label>Platforms</Label>
                    {allPlatforms?.map((el, i) => {
                        return <div key={el}>
                            <input
							key={i}
							value={el}
                            onClick={handlePlatforms}
                            type="checkbox"
                            name="platforms"
                            />
                            <span>{el}</span>                            
                        </div>
                    })}
					{errors.platforms && (<MensajeError>{errors.platforms}</MensajeError>)}

                   <Label>Genres</Label> 
                   {allGenres?.map((el, i) => {
                        return <div key={i}>
                            <input
								key={i}
                                value={el.name}
                                onClick={handleGenre}
                                type="checkbox"
                                name="genre"
                            />
                            <span>{el.name}</span>
                        </div>
                   })}
				   {errors.genre && (<MensajeError>{errors.genre}</MensajeError>)}
             
                </ContainerCheckbox>

				{validForm === false && 
                
                <MensajeError>
					<p>
						<b>Error:</b> Por favor rellena el formulario correctamente.
					</p>
				</MensajeError>}

					<Boton type="submit">Enviar</Boton>
					{validForm === true && <MensajeExito>Formulario enviado exitosamente!</MensajeExito>}
			</Formulario>
		</main>
	);
}

// https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8a29hbGF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60