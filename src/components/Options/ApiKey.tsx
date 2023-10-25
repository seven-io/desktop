import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField, {type TextFieldProps} from '@mui/material/TextField'
import {type BaseSyntheticEvent, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {initClient} from '../../util/initClient'
import {LocalStore} from '../../util/LocalStore'
import type {IOptions} from './types'

export type ApiKeyProps = Omit<TextFieldProps, 'onChange'> & {
    onChange: (apiKey: string) => void
    value: string
}

const identifier: keyof IOptions = 'apiKey'

export const ApiKey = ({value, onChange, ...props}: ApiKeyProps) => {
    const [apiKey, setApiKey] = useState('')
    const [error, setError] = useState(false)
    const [show, setShow] = useState('' === value)
    const {t} = useTranslation()

    useEffect(() => setApiKey(value), [value])

    const handleClickToggleShow = () => {
        return setShow(!show)
    }

    const handleMouseDownShow = (e: BaseSyntheticEvent) => {
        e.preventDefault()
    }

    const handleClickSave = async () => {
        const client = initClient(apiKey)

        try {
            const balance = await client.balance()
            LocalStore.set('balance', balance)
            setError(false)
            onChange(apiKey)
        } catch (e) {
            console.error(e)
            setError(true)
        }
    }

    return <TextField
        error={error}
        fullWidth
        id={identifier}
        InputProps={{
            endAdornment: <InputAdornment position='end'>
                <IconButton
                    aria-label={t('toggleApiKeyVisibility')}
                    onClick={handleClickToggleShow}
                    onMouseDown={handleMouseDownShow}
                >
                    {show ? <Visibility/> : <VisibilityOff/>}
                </IconButton>

                <Button onClick={handleClickSave}>
                    {t('ok')}
                </Button>
            </InputAdornment>,
        }}
        label={t('apiKey')}
        name={identifier}
        onChange={e => setApiKey(e.target.value)}
        required
        type={show ? 'text' : 'password'}
        value={apiKey}
        {...props}
    />
}
