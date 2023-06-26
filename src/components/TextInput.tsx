import React from 'react';
import TextField, {StandardTextFieldProps} from '@mui/material/TextField';
import {BaseInputProps} from '../types';

export type TextInputProps<S> = StandardTextFieldProps & BaseInputProps<S>

export function TextInput<S>({
                                 setState,
                                 shrink,
                                 state,
                                 stateKey,
                                 ...props
                             }: TextInputProps<S>) {
    return <TextField
        fullWidth
        InputLabelProps={{shrink}}
        onChange={e => setState({...state, [stateKey]: e.target.value})}
        value={state[stateKey] || ''}
        variant='outlined'
        {...props}
    />;
}
