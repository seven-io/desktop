import {Typography, useTheme} from '@mui/material'
import React, {useEffect, useRef, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch} from 'react-redux'
import {setTo} from '../../store/actions'
import {LocalStore} from '../../util/LocalStore'
import {BoolInput} from '../BoolInput'
import {From} from '../From'
import {To} from '../To'
import {ApiKey} from './ApiKey'
import {Signature} from './Signature'
import {IOptions} from './types'

export const Options = () => {
    const theme = useTheme()
    const $apiKey = useRef<HTMLInputElement>()
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const [state, setState] = useState<IOptions>(LocalStore.get('options'))

    useEffect(() => {
        !state.apiKey.length && $apiKey.current!.focus()
    }, [])

    const handleChange = ({target: {name, value}}: any) => {
        setState({...state, [name]: value})

        LocalStore.set(`options.${name}`, value)
    }

    return <>
        <h1>{t('options')}</h1>

        <Typography
            component='div'
            sx={{
                '& .MuiTextField-root, .MuiFormControl-root': {
                    marginBottom: theme.spacing(3),
                },
            }}
        >
            <ApiKey
                inputRef={$apiKey}
                onChange={value => handleChange({
                    target: {
                        name: 'apiKey',
                        value,
                    },
                })}
                value={state.apiKey}
            />

            <From
                helperText={t('savedAutomatically')}
                onChange={value => handleChange({target: {name: 'from', value}})}
                value={state.from}
            />

            <To
                helperText={t('savedAutomatically')}
                onChange={to => {
                    handleChange({target: {name: 'to', value: to}})

                    dispatch(setTo(to))
                }}
                value={state.to}
            />

            <Signature onChange={handleChange} value={state.signature}/>

            <BoolInput<IOptions>
                label={`${t('expertMode')} (${t('savedAutomatically')})`}
                setState={o => handleChange({
                    target: {
                        name: 'expertMode',
                        value: o.expertMode,
                    },
                })}
                state={state}
                stateKey='expertMode'
            />
        </Typography>
    </>

}
