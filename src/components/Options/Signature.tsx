import React from 'react';
import TextField, {TextFieldProps} from '@mui/material/TextField';
import {useTranslation} from 'react-i18next';

export type SignatureProps = TextFieldProps & {
    signature: string
}

export type SignaturePosition = 'append' | 'prepend';

export const Signature = ({onChange, signature, ...props}: SignatureProps) => {
    const {t} = useTranslation();

    return <TextField
        fullWidth
        helperText={t('savedAutomatically')}
        label={t('signatureExplanation')}
        multiline
        name='signature'
        value={signature}
        variant='outlined'
        {...props}
    />;
};
