import React from 'react';
import {VoiceHistory} from './History';
import {CommonMessagePropKeys, Message} from '../Message/Message';
import {sendVoice} from '../../util/sendVoice';
import {VoiceParams} from 'sms77-client';

export const Voice = () => {
    return <Message<Omit<VoiceParams, CommonMessagePropKeys>>
        dispatchFn={sendVoice}
        History={<VoiceHistory/>}
        ns='voice'
    />;
};