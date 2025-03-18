import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useAppDispatch, useAppSelector} from '../../store'
import {selectRecipients, SET_TO} from '../../store/features/to'
import type {Contact} from '@seven.io/client'
import localStore from '../../util/LocalStore'
import {Combobox, ComboboxInput, ComboboxOption, ComboboxOptions} from '@headlessui/react'
import {Field, Label} from '../catalyst/fieldset'

export const SmsRecipients = () => {
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

    return <Field>
        <Label>{t('recipients')}</Label>

        <Combobox multiple
            value={value}
            onChange={(values) => {
                console.log('onChange', values)
                dispatch(SET_TO(values ? values : []))
            }}
        >
            <ComboboxInput
                //onChange={(event) => setQuery(event.target.value)}
            />
            <ComboboxOptions>
                {options.map((option) => (
                    <ComboboxOption key={option} value={option}>
                        {option}
                    </ComboboxOption>
                ))}
            </ComboboxOptions>
        </Combobox>
    </Field>

/*    return <Autocomplete
        freeSolo
        getOptionLabel={option => {
            console.log(option)
            return option
        }}
        multiple
        onChange={(_, values) => {
            console.log('onChange', values)
            dispatch(SET_TO(Array.isArray(values) ? values : [values!]))
        }}
        options={options}
        renderOption={(props, option) => <li {...props} key={option}>{option}</li>}
        renderInput={params => <Field>
            <Label>{t('recipients')}</Label>
            <Input
                {...params}
               // label={t('recipients')}
                placeholder='+491799999999'
                //variant='standard'
            />
        </Field>}
        renderTags={(values, getTagProps) => {
            return values.map((o, index) => <Badge {...getTagProps({index})} key={o}>{o}</Badge>)
        }}
        value={value}
    />*/
}
