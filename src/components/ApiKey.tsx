import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';

export type ApiKeyProps = {
    value: any,
    onChange: any
}

export const ApiKey = ({value, onChange}: ApiKeyProps) => {
    const [apiKey, setApiKey] = useState('');

    useEffect(() => setApiKey(value), [value]);

    return <TextField
        fullWidth
        label='API key from sms77.io required for sending'
        name='apiKey'
        onChange={onChange}
        required
        value={apiKey}
    />;
};