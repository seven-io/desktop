import React, {useState} from 'react';
import {SmsParams} from 'sms77-client';
import {sendSms} from '../../util/sendSms';
import {History} from './History';
import {CommonMessagePropKeys, Message} from '../Message/Message';
import {IOptions} from '../Options/types';
import {LocalStore} from '../../util/LocalStore';
import {SmsOptions} from './SmsOptions';

export type SmsPartParams = Omit<SmsParams, CommonMessagePropKeys>

export const Sms = () => {
    const [params, setParams] = useState<SmsPartParams>({});
    const [{expertMode}] = useState<IOptions>(LocalStore.get('options'));

    return <Message<SmsPartParams>
        dispatchFn={p => sendSms({...p, options: {...p.options, ...params}})}
        FormAddons={expertMode
            ? <SmsOptions params={params} setParams={setParams}/> : null}
        History={<History/>}
        ns='sms'
        emoji={true}
    />;
};