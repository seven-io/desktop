import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Description, Field, Label} from '../Fieldset'
import {Input, type InputProps} from '../Input'

type FromProps = Omit<InputProps, 'onChange'> & {
    onChange: (from: string) => void
    value: string
}

export const DefaultFrom = ({onChange, value, ...props}: FromProps) => {
    const [from, setFrom] = useState('')
    const {t} = useTranslation()

    useEffect(() => setFrom(value), [value])

    return <Field>
        <Label>{t('senderIdentifier')}</Label>
        <Description>{t('savedAutomatically')}</Description>
        <Input
            name='from'
            onChange={e => onChange(e.target.value)}
            value={from}
            {...props}
        />
    </Field>
}
