import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import {useTranslation} from 'react-i18next';

export type FromProps = {
    value: string,
    onChange: (from: string) => void
}

export const From = ({value, onChange}: FromProps) => {
    const [from, setFrom] = useState('');
    const {t} = useTranslation();

    useEffect(() => setFrom(value), [value]);

    return <TextField
        fullWidth
        label={t('senderIdentifier')}
        name='from'
        onChange={e => onChange(e.target.value)}
        value={from}
    />;
};