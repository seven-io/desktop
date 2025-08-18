import {PaperAirplaneIcon, XMarkIcon} from '@heroicons/react/16/solid'
import {type SyntheticEvent, useEffect, useRef, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useAppDispatch, useAppSelector} from '../store'
import {initClient} from '../util/initClient'
import localStore, {localStoreDefaults} from '../util/LocalStore'
import {notify} from '../util/notify'
import {Toolbar} from '../components/Message/Toolbar'
import {SET_BACKDROP} from '../store/features/backdrop'
import {selectRecipients, SET_TO} from '../store/features/to'
import {ADD_SNACKBAR} from '../store/features/snackbars'
import {VoiceHistory} from '../components/Voice/VoiceHistory'
import {sendVoice} from '../util/sendVoice'
import {VoiceRecipients} from '../components/Voice/VoiceRecipients'
import {VoiceSender} from '../components/Voice/VoiceSender'
import {VoiceParams} from '@seven.io/client'
import {Textarea} from '../components/Textarea'
import {Field, Label} from '../components/Fieldset'
import {Button} from '../components/Button'
import {Heading} from '../components/Heading'

export function Voice() {
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
        <Heading>{t('voice:h1')}</Heading>

        <form onSubmit={handleSubmit}>
            {expertMode && <Toolbar
                emoji={false}
                onAction={setText}
                textarea={$textarea.current!}
            />}

            <Field>
                <Label>{t('label')}</Label>
                <Textarea
                    ref={$textarea}
                    onChange={ev => setText(ev.target.value)}
                    placeholder={t('helperText')}
                    required
                    rows={3}
                    value={text}
                />
            </Field>

            <VoiceRecipients />

            <VoiceSender onChange={setFrom} value={from}/>

            <div className='grid grid-cols-2 mt-6'>
                <Button
                    color='red'
                    onClick={handleClear}
                >
                    {t('clear')}
                    <XMarkIcon/>
                </Button>

                <Button
                    color='blue'
                    disabled={!text.length}
                    type='submit'
                >
                    {t('send')}
                    <PaperAirplaneIcon/>
                </Button>
            </div>
        </form>

        <VoiceHistory/>
    </>
}
