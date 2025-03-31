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
import {Textarea} from '../Textarea'
import {Description, Field, Label} from '../Fieldset'
import {Button} from '../Button'
import {PaperAirplaneIcon, XMarkIcon} from '@heroicons/react/16/solid'
import {Heading} from '../Heading'

export function Rcs() {
    const dispatch = useAppDispatch()
    const [text, setText] = useState('')
    const [from, setFrom] = useState('')
    const to = useAppSelector(selectRcsRecipient)
    const {t} = useTranslation(['message', 'rcs'])
    const $textarea = useRef(null)
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
        <Heading>{t('rcs:h1')}</Heading>

        <form onSubmit={handleSubmit}>
            {expertMode && <Toolbar
                emoji
                onAction={setText}
                textarea={$textarea.current!}
            />}

            <Field>
                <Label>{t('label')}</Label>
                <Description>{t('helperText')}</Description>
                <Textarea
                    ref={$textarea}
                    onChange={ev => setText(ev.target.value)}
                    placeholder={t('helperText')}
                    required
                    rows={3}
                    value={text}
                />
            </Field>

            <RcsRecipient />

            <From onChange={setFrom} value={from}/>

            <RcsOptions params={params} setParams={setParams}/>

            <div className='grid grid-cols-2 mt-6'>
                <Button
                    color='red'
                    onClick={handleClear}
                >
                    {t('clear')}
                    <XMarkIcon/>
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

        <RcsHistory/>
    </>
}
