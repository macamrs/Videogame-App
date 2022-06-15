import React, { useState } from 'react';
import {Input, Label, GrupoInput, LeyendaError} from './Styled';

export default function InputComponent({state, changedState, type, label, placeholder, name, error, expresionRegular}) {

    const onChange = (e) => {
        changedState({
            ...state, 
            value : e.target.value});
    }  

    const validate = () => {
        if(expresionRegular) {
            if(expresionRegular.test(state.value)) {
                changedState({
                    ...state,
                    valid: 'true'
                })
            } else {
                changedState({
                    ...state,
                    valid: 'false'
                })
            }
        }
    }
    
	return (
		<div>
			<Label htmlFor={name} valido={state.valid}>{label}</Label>
			<GrupoInput>
				<Input 
					type={type}
					placeholder={placeholder} 
					id={name}
					value={state.value}
					onChange={onChange}
                    onKeyUp={validate}
					onBlur={validate}
					valido={state.valid}
				/>
			</GrupoInput>
			{error && <LeyendaError valido={state.valid}>{error}</LeyendaError>}
		</div>
	);
}