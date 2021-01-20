import {VoiceJsonResponse, VoiceParams} from 'sms77-client';
import {LocalStore} from './LocalStore';
import {notify} from './notify';
import {
    CommonMessagePropKeys,
    DispatchProps,
    MessageDispatchProps
} from '../components/Message/Message';
import {VoiceDump} from '../components/Voice/History';

export type VoicePartialProps = Omit<VoiceParams, CommonMessagePropKeys>
export type SendVoiceProps = MessageDispatchProps<VoicePartialProps>

export const sendVoice = async (p: DispatchProps<SendVoiceProps>) => {
    const response = await p.client.voice(p.options) as VoiceJsonResponse;

    const d: VoiceDump = {
        notification: '100' === response.success
            ? `Voice message ${response.messages[0].id} sent for ${response.total_price}€.`
            : `Error sending Voice to "${p.options.to}": ${JSON.stringify(response)}`,
        options: p.options,
        response
    };

    LocalStore.append('voices', d);

    await notify(d.notification);

    return d.notification;
};