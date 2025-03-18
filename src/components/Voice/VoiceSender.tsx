import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Input, type InputProps} from '../catalyst/input'
import {Field, Label} from '../catalyst/fieldset'

export const VoiceSender = ({onChange, value}: Pick<InputProps, 'onChange' | 'value'> & {
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
