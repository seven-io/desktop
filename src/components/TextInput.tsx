import React from 'react';
import TextField from '@material-ui/core/TextField';
import {StandardTextFieldProps} from '@material-ui/core/TextField/TextField';
import {BaseInputProps} from '../types';

export type TextInputProps<S> =
    StandardTextFieldProps
    & BaseInputProps<S>

export function TextInput<S>({
                                 label,
                                 setState,
                                 state,
                                 stateKey,
                                 ...props
                             }: TextInputProps<S>) {
    return <TextField
        fullWidth
        label={label}
        onChange={e => setState({...state, [stateKey]: e.target.value})}
        value={state[stateKey] || ''}
        {...props}
    />;
}