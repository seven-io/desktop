import {type BaseSyntheticEvent, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {initClient} from '../../util/initClient'
import type {IOptions} from './types'
import {BalanceResource} from '@seven.io/client'
import localStore from '../../util/LocalStore'
import {Input, InputGroup, type InputProps} from '../Input'
import {ErrorMessage, Field, Label} from '../Fieldset'
import {Button} from '../Button'
import {EyeIcon, EyeSlashIcon} from '@heroicons/react/16/solid'
import {captureException} from '@sentry/react'

type ApiKeyProps = Omit<InputProps, 'onChange'> & {
    onChange: (apiKey: string) => void
    value: string
}

const identifier: keyof IOptions = 'apiKey'

export const ApiKey = ({value, onChange, ...props}: ApiKeyProps) => {
    const {t} = useTranslation()
    const [apiKey, setApiKey] = useState('')
    const [error, setError] = useState('')
    const [show, setShow] = useState(false)
    const handleClickToggleShow = () => setShow(!show)
    const handleMouseDownShow = (e: BaseSyntheticEvent) => e.preventDefault()
    const handleClickSave = async () => {
        const client = initClient(apiKey)

        try {
            const balance = await (new BalanceResource(client)).get()
            localStore.set('balance', balance.amount)
            setError('')
            onChange(apiKey)
        } catch (e) {
            captureException(e, {data: {apiKey}})
            console.error(e)
            setError((e as Error).message)
        }
    }

    useEffect(() => setApiKey(value), [value])

    return <InputGroup>
        <Field>
            <Label>{t('apiKey')}</Label>
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className='flex'>
                <Input
                    id={identifier}
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
            </div>
        </Field>
    </InputGroup>
}
