import type {SmsParams} from '@seven.io/api'
import {useState} from 'react'
import {sendSms} from '../../util/sendSms'
import {type CommonMessagePropKeys, Message} from '../Message/Message'
import {History} from './History'
import {SmsOptions} from './SmsOptions'

export type SmsPartParams = Omit<SmsParams, CommonMessagePropKeys>

export const Sms = () => {
    const [params, setParams] = useState<SmsPartParams>({})

    return <Message<SmsPartParams>
        dispatchFn={p => sendSms({...p, options: {...p.options, ...params}})}
        FormAddons={<SmsOptions params={params} setParams={setParams}/>}
        History={<History/>}
        ns='sms'
        emoji={true}
    />
}
