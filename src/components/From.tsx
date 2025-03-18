import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Description, Field, Label} from './catalyst/fieldset'
import {Input, type InputProps} from './catalyst/input'

type FromProps = Omit<InputProps, 'onChange'> & {
    onChange: (from: string) => void
    value: string
    helperText?: string
}

export const From = ({onChange, helperText, value, ...props}: FromProps) => {
    const [from, setFrom] = useState('')
    const {t} = useTranslation()

    useEffect(() => setFrom(value), [value])

    return <Field>
        <Label>{t('senderIdentifier')}</Label>
        {helperText && <Description>{helperText}</Description>}
        <Input
            //fullWidth
            //label={t('senderIdentifier')}
            name='from'
            onChange={e => onChange(e.target.value)}
            value={from}
            //variant='outlined'
            {...props}
        />
    </Field>
}
