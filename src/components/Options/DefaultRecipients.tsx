import {useTranslation} from 'react-i18next'
import {useState} from 'react'
import {Contact} from '@seven.io/client'
import localStore from '../../util/LocalStore'
import {Description, Field, Label} from '../catalyst/fieldset'
import {Combobox, ComboboxInput, ComboboxOption, ComboboxOptions} from '@headlessui/react'

export default () => {
    const {t} = useTranslation()
    const [contacts] = useState(localStore.get('contacts'))
    const [state, setState] = useState(localStore.get('options'))
    const options = [
        ...new Set(
            contacts.filter((c: Contact) => c.properties.mobile_number && c.properties.mobile_number !== '')
                .map((c: Contact) => c.properties.mobile_number!)
        )
    ]

    return <Field>
        <Label>{t('recipients')}</Label>
        <Description>{t('savedAutomatically')}</Description>

        <Combobox
            value={Array.isArray(state.to) ? state.to : []}
            onChange={(values) => {
                console.log('values', values)
                setState({...state, to: values ?? []})
                localStore.set('options.to', values)
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

   /* return <Autocomplete
        freeSolo
        getOptionLabel={option => option}
        multiple
        onChange={(_, values) => {
            console.log('values', values)
            setState({...state, to: values})
            localStore.set('options.to', values)
        }}
        options={options}
        renderOption={(props, option) => {
            return <li {...props} key={option}>
                {option}
            </li>
        }}
        renderInput={params => <TextField
            {...params}
            helperText={t('savedAutomatically')}
            label={t('recipients')}
            variant='standard'
        />}
        renderTags={(values, getTagProps) => {
            return values.map((option, index) => (
                <Chip {...getTagProps({index})} key={option} label={option}/>
            ))
        }}
        value={Array.isArray(state.to) ? state.to : []}
    />*/
}