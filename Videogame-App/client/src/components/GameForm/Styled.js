import styled, {css} from 'styled-components';

const Titulo = styled.h1`
	font-size: 2.5rem;
	font-weight: bold;
	letter-spacing: 1px;
	text-transform:uppercase;
	margin-bottom: 1rem;
	background-image: linear-gradient(to right, #f6e726, #ccf270, #b5f5a8, #b9f2d1, #d8eae5);
	background-repeat: no-repeat;
	background-size: 100% 0.3em;
	background-position: 0 88%;
`;

const Formulario = styled.form`
	display: flex;
	row-gap: 2rem;
	flex-direction: column;
	justify-content: center;
	padding: 2rem;
	margin: auto;
	width: 80%;
	align-items: center;
`;

const Label = styled.label`
	font-size: 1.3rem;
	font-weight: bold;
	margin-bottom: .5rem;
	background-image: linear-gradient(to right, #f6e726, #ccf270, #b5f5a8, #b9f2d1, #d8eae5);
	background-repeat: no-repeat;
	background-size: 100% 0.3em;
	background-position: 0 88%;
	${props => props.valido === 'false' && css`
		color: red;
	`}
`;

const GrupoInput = styled.div`
	position: relative;
	z-index: 90;
`;

const Input = styled.input`
	width: 40rem;
	text-align: center;
	color: #0D1E2B;
	font-weight: 500;
	font-size: 1rem;
	border-radius: 2%;
	background-color: transparent;
	border: 2px solid #D8EAE5;
	padding: 1rem;
	width: 110%;
	box-sizing: border-box;
	outline: none;
	&:focus {
		border: 2px solid #F6E726;
		outline: none;
		box-shadow: 3px 0px 30px rgba(163,163,163, 0.4);
	}
	${props => props.valid === 'true' && css`
		border: 3px solid transparent;
	`}
	${props => props.valido === 'false' && css`
		border: 3px solid red !important;
	`}
`;

const LeyendaError = styled.p`
	font-size: 12px;
	margin-bottom: 0;
	color: red;
	display: none;
	${props => props.valido === 'true' && css`
		display: none;
	`}
	${props => props.valido === 'false' && css`
		display: block;
	`}
`;


const ContenedorTerminos = styled.div`
	grid-column: span 2;
	input {
		margin-right: 10px;
	}
	@media (max-width: 800px){
		grid-column: span 1;
	}
`;

const Boton = styled.button`
	margin: 2rem 1rem;
	width: 10rem;
	height: 3rem;
	cursor: pointer;
	font-size: 1rem;
	font-weight: bold;
	color: black;
	background: white;
	border: .1rem solid black;
	box-shadow: 
		2px 2px 0 rgb(32, 32, 32),
		-2px -2px 0 rgb(32, 32, 32),
		-2px 2px 0 #C9E5E7,
		2px -2px 0 #D8EAE5;
	transition: 350ms ease-in-out;

	&:hover {
		    box-shadow: 
		12px 3px 0 black, 
		-12px -3px 0 #D8EAE5;
		background-color: #F6E726;
	}
`;

const MensajeExito = styled.p`
	color: green;
	font-weight: bolder;
`;

const MensajeError = styled.div`
	height: 45px;
	line-height: 45px;
	padding: 0px 15px;
	color: red;
	font-weight: bolder;  
	border-radius: 3px;
	grid-column: span 2;
	p {
		margin: 0;
	} 

	b {
		margin-left: 10px;
	}
`;

const ContainerCheckbox = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	column-gap: 1.5rem;
	row-gap: 1.5rem;    
	padding-top: 1rem;
`;

export {
	Formulario,
	Label,
	GrupoInput,
	Input,
	LeyendaError,
	ContenedorTerminos,
	Boton,
	MensajeExito,
	MensajeError,
	Titulo,
	ContainerCheckbox
};

/*
.areas_form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40%;
}
.input_checkbox {
    display: flex;
    flex-direction: row;
    align-content: center;
    flex-wrap: wrap;
    width: 12rem; 
    align-items: center;
    justify-content: center;
}

.input_checkbox input[type=checkbox] {
    cursor: pointer;
    background-color: #FFFFFF;
    color: #0D1E2B;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid #0D1E2B;
    border-radius: 0.15em;
    transform: translateY(-0.075em);
}
*/