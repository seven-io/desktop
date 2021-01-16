import React from 'react';
import {SmsParams} from 'sms77-client';
import {sendSms} from '../../util/sendSms';
import {History} from './History';
import {CommonMessagePropKeys, Message} from '../Message/Message';
import {MessageToolbarProps, setRangeText} from '../Message/MessageToolbar';
import {EmojiPicker} from './EmojiPicker';

export const Send = () => {
    return <Message<Omit<SmsParams, CommonMessagePropKeys>>
        dispatchFn={sendSms}
        History={<History/>}
        ns='send'
        ToolbarAddons={(p: MessageToolbarProps) => <EmojiPicker
            onEmojiClick={(e, d) => setRangeText(d.emoji, p)}
        />}
    />;
};