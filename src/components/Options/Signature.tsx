import TextField, {TextFieldProps} from '@mui/material/TextField'
import {useTranslation} from 'react-i18next'

export type SignatureProps = Omit<TextFieldProps, 'value'> & {
    value: string
}

export type SignaturePosition = 'append' | 'prepend';

export const Signature = ({value, ...props}: SignatureProps) => {
    const {t} = useTranslation()

    return <TextField
        fullWidth
        helperText={t('savedAutomatically')}
        label={t('signatureExplanation')}
        multiline
        name='signature'
        rows='3'
        value={value}
        variant='outlined'
        {...props}
    />
}
