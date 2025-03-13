import TextField, {type TextFieldProps} from '@mui/material/TextField'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import type {MessageType} from './Message'
import Autocomplete from '@mui/material/Autocomplete'
import Chip from '@mui/material/Chip'
import {useAppDispatch, useAppSelector} from '../../store'
import {selectRecipients, SET_TO} from '../../store/features/to'
import {Contact} from '@seven.io/client'
import localStore from '../../util/LocalStore'

export const To = ({
                       msgType,
                       ...props
                   }: Omit<TextFieldProps, 'onChange' | 'value'> & {
    msgType: MessageType
}) => {
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

    return <Autocomplete
        freeSolo
        getOptionLabel={option => option}
        multiple
        onChange={(_, values) => {
            console.log('onChange', values)
            dispatch(SET_TO(values))
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
