import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import Autocomplete from '@mui/material/Autocomplete'
import {useTranslation} from 'react-i18next'
import {useState} from 'react'
import {LocalStore} from '../../util/LocalStore'

export default () => {
    const {t} = useTranslation()
    const [contacts] = useState(LocalStore.get('contacts'))
    const [state, setState] = useState(LocalStore.get('options'))
    const {to} = state
    const options = [
        ...new Set(contacts.filter(c => c.Number && c.Number !== '').map(c => c.Number!))
    ]

    return <Autocomplete
        freeSolo
        getOptionLabel={option => option}
        multiple
        onChange={(_, values) => {
            setState({...state, to: values})
            LocalStore.set('options.to', values)
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
        value={to}
    />
}