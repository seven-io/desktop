import ClearIcon from '@mui/icons-material/Clear'
import SendIcon from '@mui/icons-material/Send'
import {useTheme} from '@mui/material'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import {Client, type SmsParams, type VoiceParams} from '@seven.io/client'
import {type ReactNode, type SyntheticEvent, useEffect, useRef, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useAppDispatch, useAppSelector} from '../../store'
import {initClient} from '../../util/initClient'
import localStore, {localStoreDefaults} from '../../util/LocalStore'
import {notify} from '../../util/notify'
import {getOpts, type SendSmsProps} from '../../util/sendSms'
import {From} from '../From'
import {To} from './To'
import {Toolbar, type ToolbarProps} from './Toolbar'
import {SET_BACKDROP} from '../../store/features/backdrop'
import {selectRecipients, SET_TO} from '../../store/features/to'
import {ADD_SNACKBAR} from '../../store/features/snackbars'

export type CommonMessagePropKeys = 'from' | 'text' | 'to'
export type CommonMessageProps = Pick<SmsParams, CommonMessagePropKeys>
export type MessageDispatchProps<T> = T & CommonMessageProps

export type DispatchProps<T> = {
    client: Client
    options: SmsParams | VoiceParams
}

export type MessageProps<T> = Pick<ToolbarProps, 'emoji'> & {
    dispatchFn(p: DispatchProps<T>): Promise<string>
    FormAddons?: ReactNode
    History: ReactNode
    ns: string
    type: MessageType
}

export type MessageType = 'sms' | 'voice'

export type MessageTranslations = {
    h1: string
}

export function Message<T>(p: MessageProps<T>) {
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const [text, setText] = useState('')
    const [from, setFrom] = useState('')
    const to = useAppSelector(selectRecipients)
    const {t} = useTranslation([
        'message',
        p.ns,
    ])
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

        dispatch(ADD_SNACKBAR(await p.dispatchFn({
            client: initClient(),
            options: {...getOpts(props.text, props.to, props.from)},
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
        <h1>{t(`${p.ns}:h1`)}</h1>

        <Typography
            component='form' onSubmit={handleSubmit} sx={{
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
            },
        }}
        >
            {expertMode
                ? <Toolbar
                    emoji={p.emoji}
                    onAction={setText}
                    textarea={$textarea.current!}
                /> :
                null}

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

            <To msgType={p.type}/>

            <From onChange={setFrom} value={from}/>

            {p.FormAddons}

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
                        fullWidth type='submit'
                        variant='outlined'
                    >
                        {t('send')}
                    </Button>
                </Grid>
            </Grid>
        </Typography>

        {p.History}
    </>
}
