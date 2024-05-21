import TextField, {type TextFieldProps} from '@mui/material/TextField'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import type {MessageType} from './Message/Message'
import Autocomplete from '@mui/material/Autocomplete'
import Chip from '@mui/material/Chip'

export const To = ({
                       msgType,
                       onChange,
                       value,
                       ...props
                   }: Omit<TextFieldProps, 'onChange' | 'value'> & {
    onChange: (to: string) => void
    msgType: MessageType
    value: string
}) => {
    const {t} = useTranslation()
    const [to, setTo] = useState<string[]>([])

    useEffect(() => {
        setTo(value.split(','))
    }, [value])

    useEffect(() => {
        onChange(to.join(','))
    }, [to])

    return <Autocomplete
        freeSolo
        getOptionLabel={option => option}
        multiple
        onChange={(_, values) => setTo(values)}
        options={to}
        renderOption={(props, option) => {
            return <li {...props} key={option}>
                {option}
            </li>
        }}
        renderInput={params => <TextField
            {...params}
            {...props}
            label={t('recipients')}
            //placeholder='Favorites'
            variant='standard'
        />}
        renderTags={(values, getTagProps) => {
            return values.map((option, index) => (
                <Chip {...getTagProps({index})} key={option} label={option}/>
            ))
        }}
    />
}
