import React, {SyntheticEvent, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import TextField, {TextFieldProps} from '@material-ui/core/TextField';

export type ApiKeyProps = TextFieldProps & {
    value: string,
    onChange: (e: SyntheticEvent) => void
}

export const ApiKey = ({value, onChange, ...props}: ApiKeyProps) => {
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

        {...props}
    />;
};