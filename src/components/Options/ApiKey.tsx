import {type BaseSyntheticEvent, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {initClient} from '../../util/initClient'
import type {IOptions} from './types'
import {BalanceResource} from '@seven.io/client'
import localStore from '../../util/LocalStore'
import {Input, InputGroup, type InputProps} from '../catalyst/input'
import {Field, Label} from '../catalyst/fieldset'
import {Button} from '../catalyst/button'
import {EyeIcon, EyeSlashIcon} from '@heroicons/react/16/solid'

type ApiKeyProps = Omit<InputProps, 'onChange'> & {
    onChange: (apiKey: string) => void
    value: string
}

const identifier: keyof IOptions = 'apiKey'

export const ApiKey = ({value, onChange, ...props}: ApiKeyProps) => {
    const {t} = useTranslation()
    const [apiKey, setApiKey] = useState('')
    const [error, setError] = useState(false)
    const [show, setShow] = useState(false)
    const handleClickToggleShow = () => setShow(!show)
    const handleMouseDownShow = (e: BaseSyntheticEvent) => e.preventDefault()
    const handleClickSave = async () => {
        const client = initClient(apiKey)

        try {
            const balance = await (new BalanceResource(client)).get()
            localStore.set('balance', balance.amount)
            setError(false)
            onChange(apiKey)
        } catch (e) {
            console.error(e)
            setError(true)
        }
    }

    useEffect(() => setApiKey(value), [value])

    return <InputGroup>
        <Field>
            <Label>{t('apiKey')}</Label>

            <Input
                //error={error}
                //fullWidth
                id={identifier}
                //label={t('apiKey')}
                name={identifier}
                onChange={e => setApiKey(e.target.value)}
                required
                type={show ? 'text' : 'password'}
                value={apiKey}
                {...props}
            />

            <Button
                aria-label={t('toggleApiKeyVisibility')}
                onClick={handleClickToggleShow}
                onMouseDown={handleMouseDownShow}
            >
                {show ? <EyeIcon/> : <EyeSlashIcon/>}
            </Button>

            <Button onClick={handleClickSave}>{t('ok')}</Button>
        </Field>
    </InputGroup>
}
