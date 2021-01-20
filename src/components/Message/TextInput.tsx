import TextField from '@material-ui/core/TextField';
import React from 'react';

export type TextInputProps = {
    label: string
    onChange(name: string, value: string): void
    required?: boolean
    stateKey: string
    value: string | undefined
}

export const TextInput = ({label, required = false, value, stateKey, onChange}: TextInputProps) =>
    <TextField
        fullWidth
        label={label}
        onChange={e => onChange(stateKey, e.target.value)}
        required={required}
        value={value || ''}
    />;