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

    const [partParams, setPartParams] = useState<PartParams>({});

    const setPartParam = (key: keyof PartParams, value: PartParams[keyof PartParams]) =>
        setPartParams({...partParams, [key]: value});

    return <Message<PartParams>
        dispatchFn={p => sendSms({...p, options: {...p.options, ...partParams}})}
        FormAddons={<>
            <BoolInput
                color='primary'
                handleChange={setPartParam}
                label={t('debug')}
                stateKey='debug'
                value={partParams.debug}
            />

            <TextInput
                handleChange={setPartParam}
                label={t('delay')}
                stateKey='delay'
                value={partParams.delay}
            />

            <TextInput
                handleChange={setPartParam}
                label={t('label')}
                stateKey='label'
                value={partParams.label}
            />

            <TextInput
                handleChange={setPartParam}
                label={t('foreignId')}
                stateKey='foreign_id'
                value={partParams.foreign_id}
            />

            <TextInput
                handleChange={setPartParam}
                label={t('udh')}
                stateKey='udh'
                value={partParams.udh}
            />

            <TextInput
                handleChange={setPartParam}
                label={t('ttl')}
                stateKey='ttl'
                type='number'
                value={partParams.ttl}
            />
        </>}
        History={<History/>}
        ns='sms'
        ToolbarAddons={(p: MessageToolbarProps) => <EmojiPicker
            onEmojiClick={(e, d) => setRangeText(d.emoji, p)}
        />}
    />;
};