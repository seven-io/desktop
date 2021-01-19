import React, {useState} from 'react';
import {SmsParams} from 'sms77-client';
import {sendSms} from '../../util/sendSms';
import {History} from './History';
import {CommonMessagePropKeys, Message} from '../Message/Message';
import {MessageToolbarProps, setRangeText} from '../Message/MessageToolbar';
import {EmojiPicker} from '../Message/EmojiPicker';
import {Label} from './Label';

type PartParams = Omit<SmsParams, CommonMessagePropKeys | 'json'>

export const Sms = () => {
    const [partParams, setPartParams] = useState<PartParams>({
        label: undefined,
    });

    const setPartParam = (key: keyof PartParams, value: any) =>
        setPartParams({...partParams, [key]: value});

    return <Message<PartParams>
        dispatchFn={(p) => {
            p.options = {...p.options, ...partParams};

            return sendSms(p);
        }}
        FormAddons={<>
            <Label onChange={label => setPartParam('label', label)}/>
        </>}
        History={<History/>}
        ns='sms'
        ToolbarAddons={(p: MessageToolbarProps) => <EmojiPicker
            onEmojiClick={(e, d) => setRangeText(d.emoji, p)}
        />}
    />;
};