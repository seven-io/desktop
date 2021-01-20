import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {SmsParams} from 'sms77-client';
import {sendSms} from '../../util/sendSms';
import {History} from './History';
import {CommonMessagePropKeys, Message} from '../Message/Message';
import {MessageToolbarProps, setRangeText} from '../Message/MessageToolbar';
import {EmojiPicker} from '../Message/EmojiPicker';
import {TextInput} from '../TextInput';
import {BoolInput} from '../BoolInput';

type PartParams = Omit<SmsParams, CommonMessagePropKeys | 'json'>

export const Sms = () => {
    const {t} = useTranslation('sms');
    const [params, setParams] = useState<PartParams>({});

    return <Message<PartParams>
        dispatchFn={p => sendSms({...p, options: {...p.options, ...params}})}
        FormAddons={<>
            <BoolInput<PartParams>
                label={t('debug')}
                setState={setParams}
                state={params}
                stateKey='debug'
            />

            <BoolInput<PartParams>
                label={t('flash')}
                setState={setParams}
                state={params}
                stateKey='flash'
            />

            <BoolInput<PartParams>
                label={t('noReload')}
                setState={setParams}
                state={params}
                stateKey='no_reload'
            />

            <BoolInput<PartParams>
                label={t('unicode')}
                setState={setParams}
                state={params}
                stateKey='unicode'
            />

            <TextInput<PartParams>
                label={t('delay')}
                setState={setParams}
                state={params}
                stateKey='delay'
            />

            <TextInput<PartParams>
                label={t('label')}
                setState={setParams}
                state={params}
                stateKey='label'
            />

            <TextInput<PartParams>
                label={t('foreignId')}
                setState={setParams}
                state={params}
                stateKey='foreign_id'
            />

            <TextInput<PartParams>
                label={t('udh')}
                setState={setParams}
                state={params}
                stateKey='udh'
            />

            <TextInput<PartParams>
                label={t('ttl')}
                setState={setParams}
                state={params}
                stateKey='ttl'
                type='number'
            />
        </>}
        History={<History/>}
        ns='sms'
        ToolbarAddons={(p: MessageToolbarProps) => <EmojiPicker
            onEmojiClick={(e, d) => setRangeText(d.emoji, p)}
        />}
    />;
};