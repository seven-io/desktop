import type {SmsParams} from '@seven.io/client'
import {type SyntheticEvent, useEffect, useRef, useState} from 'react'
import {sendSms, type SendSmsProps} from '../../util/sendSms'
import {type CommonMessagePropKeys} from '../Message/Message'
import {SmsHistory} from './SmsHistory'
import {SmsOptions} from './SmsOptions'
import {useAppDispatch, useAppSelector} from '../../store'
import {selectRecipients, SET_TO} from '../../store/features/to'
import {useTranslation} from 'react-i18next'
import localStore, {localStoreDefaults} from '../../util/LocalStore'
import {SET_BACKDROP} from '../../store/features/backdrop'
import {notify} from '../../util/notify'
import {ADD_SNACKBAR} from '../../store/features/snackbars'
import {initClient} from '../../util/initClient'
import {Toolbar} from '../Message/Toolbar'
import {From} from '../From'
import {SmsRecipients} from './SmsRecipients'
import {Textarea} from '../Textarea'
import {Field, Label} from '../Fieldset'
import {Button} from '../Button'
import {PaperAirplaneIcon, XMarkIcon} from '@heroicons/react/16/solid'
import {Heading} from '../Heading'

export type SmsPartParams = Omit<SmsParams, CommonMessagePropKeys>

export const Sms = () => {
    const [params, setParams] = useState<SmsPartParams>({})
    const dispatch = useAppDispatch()
    const [text, setText] = useState('')
    const [from, setFrom] = useState('')
    const to = useAppSelector(selectRecipients)
    const {t} = useTranslation(['message', 'sms'])
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
            options: {
                ...props,
                ...params,
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
        <Heading>{t('sms:h1')}</Heading>

        <form onSubmit={handleSubmit}>
            {expertMode && <Toolbar
                emoji
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

            <SmsRecipients />

            <From onChange={setFrom} value={from}/>

            <SmsOptions params={params} setParams={setParams}/>

            <div className='grid grid-cols-2 mt-6'>
                <Button
                    color='red'
                    onClick={handleClear}
                >
                    {t('clear')}
                    <XMarkIcon />
                </Button>

                <Button
                    disabled={!text.length}
                    type='submit'
                >
                    {t('send')}
                    <PaperAirplaneIcon />
                </Button>
            </div>
        </form>

        <SmsHistory/>
    </>
}
