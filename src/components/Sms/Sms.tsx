import React, {useState} from 'react';
import {SmsParams} from 'sms77-client';
import {sendSms} from '../../util/sendSms';
import {History} from './History';
import {CommonMessagePropKeys, Message} from '../Message/Message';
import {SmsOptions} from './SmsOptions';

export type SmsPartParams = Omit<SmsParams, CommonMessagePropKeys>

export const Sms = () => {
    const [params, setParams] = useState<SmsPartParams>({});

    return <Message<SmsPartParams>
        dispatchFn={p => sendSms({...p, options: {...p.options, ...params}})}
        FormAddons={<SmsOptions params={params} setParams={setParams}/>}
        History={<History/>}
        ns='sms'
        emoji={true}
    />;
};