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

    const setPartParam = (k: keyof PartParams, v: PartParams[keyof PartParams]) =>
        setParams({...params, [k]: v});

    return <Message<PartParams>
        dispatchFn={p => sendSms({...p, options: {...p.options, ...params}})}
        FormAddons={<>
            <BoolInput
                handleChange={setPartParam}
                label={t('debug')}
                stateKey='debug'
                value={params.debug}
            />

            <BoolInput
                handleChange={setPartParam}
                label={t('noReload')}
                stateKey='no_reload'
                value={params.no_reload}
            />

            <TextInput
                handleChange={setPartParam}
                label={t('delay')}
                stateKey='delay'
                value={params.delay}
            />

            <TextInput
                handleChange={setPartParam}
                label={t('label')}
                stateKey='label'
                value={params.label}
            />

            <TextInput
                handleChange={setPartParam}
                label={t('foreignId')}
                stateKey='foreign_id'
                value={params.foreign_id}
            />

            <TextInput
                handleChange={setPartParam}
                label={t('udh')}
                stateKey='udh'
                value={params.udh}
            />

            <TextInput
                handleChange={setPartParam}
                label={t('ttl')}
                stateKey='ttl'
                type='number'
                value={params.ttl}
            />
        </>}
        History={<History/>}
        ns='sms'
        ToolbarAddons={(p: MessageToolbarProps) => <EmojiPicker
            onEmojiClick={(e, d) => setRangeText(d.emoji, p)}
        />}
    />;
};