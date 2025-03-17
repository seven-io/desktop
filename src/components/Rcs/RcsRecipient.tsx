import TextField, {type TextFieldProps} from '@mui/material/TextField'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import Autocomplete from '@mui/material/Autocomplete'
import Chip from '@mui/material/Chip'
import {useAppDispatch, useAppSelector} from '../../store'
import {selectRcsRecipient, SET_TO_RCS} from '../../store/features/to'
import {Contact} from '@seven.io/client'
import localStore from '../../util/LocalStore'

export const RcsRecipient = ({
                       ...props
                   }: Omit<TextFieldProps, 'onChange' | 'value'>) => {
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

    return <Autocomplete<string, false, false, true>
        freeSolo
        getOptionLabel={option => {
            console.log(option)
            return option
        }}
        onChange={(_, value) => {
            console.log('onChange', value)
            dispatch(SET_TO_RCS(value ?? ''))
        }}
        options={options}
        renderOption={(props, option) => <li {...props} key={option}>{option}</li>}
        renderInput={params => <TextField
            {...params}
            {...props}
            label={t('recipients')}
            placeholder='+491799999999'
            variant='standard'
        />}
        renderTags={(values, getTagProps) => {
            return values.map((o, index) => <Chip {...getTagProps({index})} key={o} label={o}/>)
        }}
        value={value}
    />
}
