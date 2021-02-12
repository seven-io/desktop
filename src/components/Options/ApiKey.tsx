import React, {BaseSyntheticEvent, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    InputProps
} from '@material-ui/core';
import {Visibility, VisibilityOff} from '@material-ui/icons';

export type ApiKeyProps = InputProps & {
    value: string
}

export const ApiKey = ({value, ...props}: ApiKeyProps) => {
    const [show, setShow] = useState(false);
    const [apiKey, setApiKey] = useState('');
    const {t} = useTranslation();

    useEffect(() => setApiKey(value), [value]);

    const handleClickToggleShow = () => {
        return setShow(!show);
    };

    const handleMouseDownShow = (e: BaseSyntheticEvent) => {
        e.preventDefault();
    };

    return <FormControl fullWidth>
        <InputLabel htmlFor='apiKey'>{t('apiKeyRequired')}</InputLabel>
        <Input
            endAdornment={
                <InputAdornment position='end'>
                    <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickToggleShow}
                        onMouseDown={handleMouseDownShow}
                    >
                        {show ? <Visibility/> : <VisibilityOff/>}
                    </IconButton>
                </InputAdornment>
            }
            fullWidth
            id='apiKey'
            name='apiKey'
            required
            value={apiKey}
            type={show ? 'text' : 'password'}
            {...props}
        />
    </FormControl>;
};