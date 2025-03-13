import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import Autocomplete from '@mui/material/Autocomplete'
import {useTranslation} from 'react-i18next'
import {useState} from 'react'
import {Contact} from '@seven.io/client'
import localStore from '../../util/LocalStore'

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

    return <Autocomplete
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
    />
}