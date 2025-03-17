import {Client, VoiceParams, VoiceResource} from '@seven.io/client'
import type {VoiceDump} from '../components/Voice/VoiceHistory'
import {notify} from './notify'
import localStore from './LocalStore'

type DispatchProps = {
    client: Client
    options: VoiceParams
}


export const sendVoice = async (p: DispatchProps) => {
    const response = await (new VoiceResource(p.client)).dispatch(p.options as VoiceParams)

    const d: VoiceDump = {
        notification: '100' === response.success
            ? `Voice message ${response.messages[0].id} sent for ${response.total_price}€.`
            : `Error sending Voice to "${p.options.to}": ${JSON.stringify(response)}`,
        options: p.options,
        response,
    }

    localStore.set('voices', [...localStore.get('voices'), d])

    await notify(d.notification)

    return d.notification
}
