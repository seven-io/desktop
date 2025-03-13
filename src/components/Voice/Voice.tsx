import type {VoiceParams} from '@seven.io/client'
import {sendVoice} from '../../util/sendVoice'
import {type CommonMessagePropKeys, Message} from '../Message/Message'
import {VoiceHistory} from './History'

export type VoicePartParams = Omit<VoiceParams, CommonMessagePropKeys>

export const Voice = () => {
    return <Message<VoicePartParams>
        dispatchFn={sendVoice}
        FormAddons={<></>}
        History={<VoiceHistory/>}
        ns='voice'
        type='voice'
    />
}
