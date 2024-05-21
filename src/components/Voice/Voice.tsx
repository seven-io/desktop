import type {VoiceParams} from '@seven.io/api'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {sendVoice} from '../../util/sendVoice'
import {type CommonMessagePropKeys, Message} from '../Message/Message'
import {VoiceHistory} from './History'

export type VoicePartParams = Omit<VoiceParams, CommonMessagePropKeys>

export const Voice = () => {
    const {t} = useTranslation('voice')
    const [params, setParams] = useState<VoicePartParams>({})

    return <Message<VoicePartParams>
        dispatchFn={sendVoice}
        FormAddons={<></>}
        History={<VoiceHistory/>}
        ns='voice'
        type='voice'
    />
}
