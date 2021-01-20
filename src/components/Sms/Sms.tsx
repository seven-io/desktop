import React, {useState} from 'react';
import {SmsParams} from 'sms77-client';
import {sendSms} from '../../util/sendSms';
import {History} from './History';
import {CommonMessagePropKeys, Message} from '../Message/Message';
import {MessageToolbarProps, setRangeText} from '../Message/MessageToolbar';
import {EmojiPicker} from '../Message/EmojiPicker';
import {useTranslation} from 'react-i18next';
import {TextInput} from '../Message/TextInput';

type PartParams = Omit<SmsParams, CommonMessagePropKeys | 'json'>

export const Sms = () => {
    const {t} = useTranslation('sms');

    const [partParams, setPartParams] = useState<PartParams>({});

    const setPartParam = (key: keyof PartParams, value: any) =>
        setPartParams({...partParams, [key]: value});

    return <Message<PartParams>
        dispatchFn={(p) => {
            p.options = {...p.options, ...partParams};

            return sendSms(p);
        }}
        FormAddons={<>
            <TextInput
                label={t('delay')}
                onChange={setPartParam}
                stateKey='delay'
                value={partParams.delay}
            />

            <TextInput
                label={t('label')}
                onChange={setPartParam}
                stateKey='label'
                value={partParams.label}
            />

            <TextInput
                label={t('foreignId')}
                onChange={setPartParam}
                stateKey='foreign_id'
                value={partParams.foreign_id}
            />

            <TextInput
                label={t('udh')}
                onChange={setPartParam}
                stateKey='udh'
                value={partParams.udh}
            />
        </>}
        History={<History/>}
        ns='sms'
        ToolbarAddons={(p: MessageToolbarProps) => <EmojiPicker
            onEmojiClick={(e, d) => setRangeText(d.emoji, p)}
        />}
    />;
};