import type {SmsParams} from '@seven.io/client'
import {type SyntheticEvent, useEffect, useRef, useState} from 'react'
import {getOpts, sendSms, type SendSmsProps} from '../../util/sendSms'
import {type CommonMessagePropKeys} from '../Message/Message'
import {SmsHistory} from './SmsHistory'
import {SmsOptions} from './SmsOptions'
import {useTheme} from '@mui/material'
import {useAppDispatch, useAppSelector} from '../../store'
import {selectRecipients, SET_TO} from '../../store/features/to'
import {useTranslation} from 'react-i18next'
import localStore, {localStoreDefaults} from '../../util/LocalStore'
import {SET_BACKDROP} from '../../store/features/backdrop'
import {notify} from '../../util/notify'
import {ADD_SNACKBAR} from '../../store/features/snackbars'
import {initClient} from '../../util/initClient'
import Typography from '@mui/material/Typography'
import {Toolbar} from '../Message/Toolbar'
import TextField from '@mui/material/TextField'
import {From} from '../From'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import ClearIcon from '@mui/icons-material/Clear'
import SendIcon from '@mui/icons-material/Send'
import {SmsRecipients} from './SmsRecipients'

export type SmsPartParams = Omit<SmsParams, CommonMessagePropKeys>

export const Sms = () => {
    const [params, setParams] = useState<SmsPartParams>({})
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const [text, setText] = useState('')
    const [from, setFrom] = useState('')
    const to = useAppSelector(selectRecipients)
    const {t} = useTranslation(['message', 'sms'])
    const $textarea = useRef()
    const [expertMode, setExpertMode] = useState<boolean>(localStore.get('options.expertMode'))

    useEffect(() => {
        setDefaults()

        localStore.onDidChange('options', (options) => {
            options && setExpertMode(options.expertMode)
        })
    }, [])

    const handleClear = () => {
        setText('')

        setDefaults()
    }

    const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
        e.preventDefault()

        dispatch(SET_BACKDROP(true))

        const props: SendSmsProps = {text, to, from}
        const errors = []

        if (!props.to.length) props.to = localStore.get('options.to')

        if (props.from && !props.from.length) props.from = localStore.get('options.from')

        if (errors.length) {
            errors.unshift('Error(s) while validation:')

            const notification = errors.join('\n')
            await notify(notification)
            dispatch(ADD_SNACKBAR(notification))

            return
        }

        dispatch(ADD_SNACKBAR(await sendSms({
            client: initClient(),
            options: getOpts(props.text, props.to, props.from),
        })))

        dispatch(SET_BACKDROP(false))
    }

    const setDefaults = () => {
        const signature = localStore.get('options.signature', '')

        if (signature) {
            setText(signature)
        }

        setFrom(localStore.get('options.from', localStoreDefaults.options.from))

        SET_TO(localStore.get('options.to', localStoreDefaults.options.to))
    }

    return <>
        <h1>{t('sms:h1')}</h1>

        <Typography
            component='form' onSubmit={handleSubmit} sx={{
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
            },
        }}
        >
            {expertMode && <Toolbar
                emoji
                onAction={setText}
                textarea={$textarea.current!}
            />}

            <TextField
                fullWidth
                helperText={t('helperText')}
                inputRef={$textarea}
                label={t('label')}
                multiline
                onChange={ev => setText(ev.target.value)}
                required
                rows='3'
                value={text}
                variant='outlined'
            />

            <SmsRecipients />

            <From onChange={setFrom} value={from}/>

            <SmsOptions params={params} setParams={setParams}/>

            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Button
                        endIcon={<ClearIcon/>}
                        fullWidth
                        onClick={handleClear}
                        sx={{color: 'red'}}
                        variant='outlined'
                    >
                        {t('clear')}
                    </Button>
                </Grid>

                <Grid item xs={8}>
                    <Button
                        color='primary'
                        disabled={!text.length}
                        endIcon={<SendIcon/>}
                        fullWidth
                        type='submit'
                        variant='outlined'
                    >
                        {t('send')}
                    </Button>
                </Grid>
            </Grid>
        </Typography>

        <SmsHistory/>
    </>
}
