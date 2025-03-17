import ClearIcon from '@mui/icons-material/Clear'
import SendIcon from '@mui/icons-material/Send'
import {useTheme} from '@mui/material'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import {RcsDispatchParams} from '@seven.io/client'
import {type SyntheticEvent, useEffect, useRef, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useAppDispatch, useAppSelector} from '../../store'
import {initClient} from '../../util/initClient'
import localStore, {localStoreDefaults} from '../../util/LocalStore'
import {notify} from '../../util/notify'
import {From} from '../From'
import {RcsRecipient} from './RcsRecipient'
import {Toolbar} from '../Message/Toolbar'
import {SET_BACKDROP} from '../../store/features/backdrop'
import {selectRcsRecipient, SET_TO} from '../../store/features/to'
import {ADD_SNACKBAR} from '../../store/features/snackbars'
import {RcsPartialProps, sendRcs} from '../../util/sendRcs'
import {RcsHistory} from './RcsHistory'
import {RcsOptions} from './RcsOptions'

export function Rcs() {
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const [text, setText] = useState('')
    const [from, setFrom] = useState('')
    const to = useAppSelector(selectRcsRecipient)
    const {t} = useTranslation([
        'message',
        'rcs',
    ])
    const $textarea = useRef()
    const [expertMode, setExpertMode] = useState<boolean>(localStore.get('options.expertMode'))
    const [params, setParams] = useState<RcsPartialProps>({})

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

        const dispatchParams: RcsDispatchParams = {text, to, from}
        const errors = []

        if (!dispatchParams.to.length) dispatchParams.to = localStore.get('options.to')

        //if (params.from && !params.from.length) params.from = localStore.get('options.from')

        if (errors.length) {
            errors.unshift('Error(s) while validation:')

            const notification = errors.join('\n')
            await notify(notification)
            dispatch(ADD_SNACKBAR(notification))

            return
        }

        dispatch(ADD_SNACKBAR(await sendRcs({
            client: initClient(),
            options: {
                ...params,
                ...dispatchParams
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
        <h1>{t('rcs:h1')}</h1>

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

            <RcsRecipient />

            <From onChange={setFrom} value={from}/>

            <RcsOptions params={params} setParams={setParams}/>

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

        <RcsHistory/>
    </>
}
