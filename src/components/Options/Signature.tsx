import React, {SyntheticEvent} from 'react';
import TextField from '@material-ui/core/TextField';
import {useTranslation} from 'react-i18next';

export type SignatureProps = {
    onChange: (ev: SyntheticEvent) => void
    signature: string
}

export type SignaturePosition = 'append' | 'prepend';

export const Signature = ({onChange, signature}: SignatureProps) => {
    const {t} = useTranslation();

    return <TextField
        fullWidth
        label={t('signatureExplanation')}
        multiline
        name='signature'
        onChange={onChange}
        value={signature}
    />;
};