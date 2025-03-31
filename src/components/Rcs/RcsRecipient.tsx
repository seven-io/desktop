import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useAppDispatch, useAppSelector} from '../../store'
import {selectRcsRecipient, SET_TO_RCS} from '../../store/features/to'
import {Contact} from '@seven.io/client'
import localStore from '../../util/LocalStore'
import {Field, Label} from '../Fieldset'
import {Combobox, ComboboxInput, ComboboxOption, ComboboxOptions} from '@headlessui/react'

export const RcsRecipient = () => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    const [storage] = useState(localStore.get('options'))
    const {to: defaultRecipients} = storage
    const recipient = useAppSelector(selectRcsRecipient)
    const value = recipient.length ? recipient : defaultRecipients[0] ?? ''
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
            onChange={(value) => {
                console.log('onChange', value)
                dispatch(SET_TO_RCS(value ?? ''))
            }}
            value={value}
        >
            <ComboboxInput
                className='dark:text-white'
                displayValue={(value: string) => value}
                onChange={(ev) => setQuery(ev.target.value)}
                placeholder='+491799999999'
            />
            <ComboboxOptions>
                {filteredRecipients.map((option) => (
                    <ComboboxOption className='dark:text-white' key={option} value={option}>
                        {option}
                    </ComboboxOption>
                ))}
            </ComboboxOptions>
        </Combobox>
    </Field>
}
