import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import {InputDialog} from './InputDialog';

export type ToProps = {
    asDialog?: boolean
    onChange: (to: string) => void
    value: string
}

export const To = ({onChange, value, asDialog = false}: ToProps) => {
    const [to, setTo] = useState('');

    useEffect(() => setTo(value), [value]);

    const Input = <TextField
        fullWidth
        label='Recipient'
        name='to'
        onChange={e => onChange(e.target.value)}
        value={to}
    />;

    return asDialog
        ? <InputDialog text='Please type in a recipient' title='Missing Recipient' children={Input}/>
        : Input;
};