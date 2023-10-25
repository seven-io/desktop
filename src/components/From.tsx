import TextField, {TextFieldProps} from '@mui/material/TextField'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'

export type FromProps = Omit<TextFieldProps, 'onChange'> & {
    onChange: (from: string) => void
    value: string
}

export const From = ({onChange, value, ...props}: FromProps) => {
    const [from, setFrom] = useState('')
    const {t} = useTranslation()

    useEffect(() => setFrom(value), [value])

    return <TextField
        fullWidth
        label={t('senderIdentifier')}
        name='from'
        onChange={e => onChange(e.target.value)}
        value={from}
        variant='outlined'
        {...props}
    />
}
