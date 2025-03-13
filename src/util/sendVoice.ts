import {VoiceParams, VoiceResource} from '@seven.io/client'
import type {CommonMessagePropKeys, DispatchProps, MessageDispatchProps,} from '../components/Message/Message'
import type {VoiceDump} from '../components/Voice/History'
import {notify} from './notify'
import localStore from './LocalStore'

export type VoicePartialProps = Omit<VoiceParams, CommonMessagePropKeys>
export type SendVoiceProps = MessageDispatchProps<VoicePartialProps>

export const sendVoice = async (p: DispatchProps<SendVoiceProps>) => {
    const response = await (new VoiceResource(p.client)).dispatch(p.options as VoiceParams)

    const d: VoiceDump = {
        notification: '100' === response.success
            ? `Voice message ${response.messages[0].id} sent for ${response.total_price}€.`
            : `Error sending Voice to "${p.options.to}": ${JSON.stringify(response)}`,
        // @ts-ignore TODO: fix this
        options: p.options,
        response,
    }

    localStore.set('voices', [...localStore.get('voices'), d])

    await notify(d.notification)

    return d.notification
}
