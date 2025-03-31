import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Input, type InputProps} from '../Input'
import {Field, Label} from '../Fieldset'

export const VoiceSender = ({onChange, value}: Omit<InputProps, 'onChange' | 'value'> & {
    onChange: (from: string) => void
    value: string
}) => {
    const [from, setFrom] = useState('')
    const {t} = useTranslation()

    useEffect(() => setFrom(value), [value])

    return <Field>
        <Label>{t('senderIdentifier')}</Label>
        <Input
            //fullWidth
            //label={t('senderIdentifier')}
            name='from'
            onChange={e => onChange(e.target.value)}
            value={from}
            //variant='outlined'
            //{...props}
        />
    </Field>
}
