import TextField, {type TextFieldProps} from '@mui/material/TextField'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'

export type ToProps = Omit<TextFieldProps, 'onChange'> & {
    onChange: (to: string) => void
    value: string
}

export const To = ({onChange, value, ...props}: ToProps) => {
    const {t} = useTranslation()

    const [to, setTo] = useState('')

    useEffect(() => setTo(value), [value])

    return <TextField
        fullWidth
        label={t('onePlusRecipient')}
        name='to'
        onChange={e => onChange(e.target.value)}
        value={to}
        variant='outlined'
        {...props}
    />
}
