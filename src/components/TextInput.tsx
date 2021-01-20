import React from 'react';
import TextField from '@material-ui/core/TextField';
import {StandardTextFieldProps} from '@material-ui/core/TextField/TextField';
import {BaseInputProps} from '../types';

export type TextInputProps =
    StandardTextFieldProps
    & BaseInputProps<string | number, string>

export const TextInput = ({handleChange, label, value = '', stateKey, ...props}: TextInputProps) =>
    <TextField
        fullWidth
        label={label}
        name={stateKey}
        onChange={e => handleChange(stateKey, e.target.value)}
        value={value}
        {...props}
    />;