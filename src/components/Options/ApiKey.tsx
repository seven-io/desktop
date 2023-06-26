import {InputProps} from '@mui/material'
import React, {BaseSyntheticEvent, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {initClient} from '../../util/initClient';
import {LocalStore} from '../../util/LocalStore';
import {IOptions} from './types';

export type ApiKeyProps = Omit<InputProps, 'onChange'> & {
    onChange: (apiKey: string) => void
    value: string
}

const identifier: keyof IOptions = 'apiKey';

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
            htmlFor='apiKey'>{t('apiKey')} - <strong>{t('required')}</strong>
        </InputLabel>

        <OutlinedInput
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
            id={identifier}
            name={identifier}
            onChange={e => setApiKey(e.target.value)}
            required
            type={show ? 'text' : 'password'}
            value={apiKey}
            {...props}
        />
    </FormControl>;
};
