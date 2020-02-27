import React, {useEffect, useState, SyntheticEvent} from 'react';
import TextField from '@material-ui/core/TextField';
import {useTranslation} from 'react-i18next';

export type ApiKeyProps = {
    value: string,
    onChange: (e: SyntheticEvent) => void
}

export const ApiKey = ({value, onChange}: ApiKeyProps) => {
    const [apiKey, setApiKey] = useState('');
    const {t} = useTranslation();

    useEffect(() => setApiKey(value), [value]);

    return <TextField
        fullWidth
        label={t('apiKeyRequired')}
        name='apiKey'
        onChange={onChange}
        required
        value={apiKey}
    />;
};