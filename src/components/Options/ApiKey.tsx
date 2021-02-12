import React, {BaseSyntheticEvent, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
    Button,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    InputProps
} from '@material-ui/core';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import {initClient} from '../../util/initClient';
import {LocalStore} from '../../util/LocalStore';

export type ApiKeyProps = Omit<InputProps, 'onChange'> & {
    onChange: (apiKey: string) => void
    value: string
}

export const ApiKey = ({value, onChange, ...props}: ApiKeyProps) => {
    const [apiKey, setApiKey] = useState('');
    const [error, setError] = useState(false);
    const [show, setShow] = useState('' === value);
    const {t} = useTranslation();

    useEffect(() => setApiKey(value), [value]);

    const handleClickToggleShow = () => {
        return setShow(!show);
    };

    const handleMouseDownShow = (e: BaseSyntheticEvent) => {
        e.preventDefault();
    };

    const handleClickSave = async () => {
        const client = initClient(apiKey);

        try {
            LocalStore.set('balance', await client.balance());
            setError(false);
            onChange(apiKey);
        } catch (e) {
            setError(true);
        }
    };

    return <FormControl fullWidth>
        <InputLabel
            htmlFor='apiKey'>{t('apiKey')} - <strong>{t('required')}</strong></InputLabel>
        <Input
            endAdornment={
                <InputAdornment position='end'>
                    <IconButton
                        aria-label={t('toggleApiKeyVisibility')}
                        onClick={handleClickToggleShow}
                        onMouseDown={handleMouseDownShow}
                    >
                        {show ? <Visibility/> : <VisibilityOff/>}
                    </IconButton>

                    <Button onClick={handleClickSave}>
                        {t('ok')}
                    </Button>
                </InputAdornment>
            }
            error={error}
            fullWidth
            id='apiKey'
            name='apiKey'
            onChange={e => setApiKey(e.target.value)}
            required
            value={apiKey}
            type={show ? 'text' : 'password'}
            {...props}
        />
    </FormControl>;
};