import ClearIcon from '@mui/icons-material/Clear'
import SendIcon from '@mui/icons-material/Send'
import {useTheme} from '@mui/material'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import {type SyntheticEvent, useEffect, useRef, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useAppDispatch, useAppSelector} from '../../store'
import {initClient} from '../../util/initClient'
import localStore, {localStoreDefaults} from '../../util/LocalStore'
import {notify} from '../../util/notify'
import {Toolbar} from '../Message/Toolbar'
import {SET_BACKDROP} from '../../store/features/backdrop'
import {selectRecipients, SET_TO} from '../../store/features/to'
import {ADD_SNACKBAR} from '../../store/features/snackbars'
import {VoiceHistory} from './VoiceHistory'
import {sendVoice} from '../../util/sendVoice'
import {VoiceRecipients} from './VoiceRecipients'
import {VoiceSender} from './VoiceSender'
import {VoiceParams} from '@seven.io/client'

export function Voice() {
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const [text, setText] = useState('')
    const [from, setFrom] = useState('')
    const to = useAppSelector(selectRecipients)
    const {t} = useTranslation(['message', 'voice'])
    const $textarea = useRef(null)
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

        const props: VoiceParams = {text, to, from}
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

        dispatch(ADD_SNACKBAR(await sendVoice({
            client: initClient(),
            options: {
                from: props.from,
                text: props.text,
                to: props.to
            },
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
        <h1>{t('voice:h1')}</h1>

        <Typography
            component='form' onSubmit={handleSubmit} sx={{
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
            },
        }}
        >
            {expertMode && <Toolbar
                emoji={false}
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

            <VoiceRecipients />

            <VoiceSender onChange={setFrom} value={from}/>

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

        <VoiceHistory/>
    </>
}
