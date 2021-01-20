import TextField, {BaseTextFieldProps} from '@material-ui/core/TextField';
import React from 'react';

export type TextInputProps = BaseTextFieldProps & {
    label: string
    onChange(name: string, value: string): void
    required?: boolean
    stateKey: string
    value: string | undefined
}

export const TextInput =
    ({label, required = false, value, stateKey, onChange, ...props}: TextInputProps) =>
        <TextField
            fullWidth
            label={label}
            onChange={e => onChange(stateKey, e.target.value)}
            required={required}
            value={value || ''}
            {...props}
        />;