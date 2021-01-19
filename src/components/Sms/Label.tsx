import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import {SmsParams} from 'sms77-client';

export type LabelProps = {
    onChange: (from: SmsParams['label']) => void
}

export const Label = ({onChange}: LabelProps) => {
    const [label, setLabel] = useState<SmsParams['label']>();

    useEffect(() => onChange(label), [label]);

    return <TextField
        fullWidth
        label={useTranslation('sms').t('label')}
        onChange={e => setLabel(e.target.value)}
        value={label}
    />;
};