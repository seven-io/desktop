import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useAppDispatch, useAppSelector} from '../../store'
import {selectRecipients, SET_TO} from '../../store/features/to'
import type {Contact} from '@seven.io/client'
import localStore from '../../util/LocalStore'
import {Field, Label} from '../Fieldset'
import {Combobox, ComboboxInput, ComboboxOption, ComboboxOptions} from '@headlessui/react'

export const VoiceRecipients = () => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    const [storage] = useState(localStore.get('options'))
    const {to: defaultRecipients} = storage
    const recipients = useAppSelector(selectRecipients)
    const value = recipients.length ? recipients : [...new Set([...defaultRecipients, ...recipients])]
    const [contacts] = useState(localStore.get('contacts'))
    const options = [
        ...new Set(
            contacts.filter((c: Contact) => c.properties.mobile_number && c.properties.mobile_number !== '')
                .map((c: Contact) => c.properties.mobile_number!)
        )
    ]
    const [query, setQuery] = useState('')
    const filteredRecipients =
        query === ''
            ? options
            : options.filter((option) => {
                return option.toLowerCase().includes(query.toLowerCase())
            })

    return <Field>
        <Label>{t('recipients')}</Label>

        <Combobox
            immediate
            multiple
            onChange={(values) => {
                dispatch(SET_TO(values))
            }}
            value={value}
        >
            <ComboboxInput
                displayValue={(value: string) => value}
                onChange={(ev) => setQuery(ev.target.value)}
                placeholder='+491799999999'
            />
            <ComboboxOptions>
                {filteredRecipients.map((option) => (
                    <ComboboxOption key={option} value={option}>
                        {option}
                    </ComboboxOption>
                ))}
            </ComboboxOptions>
        </Combobox>
    </Field>
}
