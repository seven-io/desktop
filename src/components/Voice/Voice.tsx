import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {VoiceParams} from 'sms77-client';
import {VoiceHistory} from './History';
import {CommonMessagePropKeys, Message} from '../Message/Message';
import {sendVoice} from '../../util/sendVoice';
import {BoolInput} from '../BoolInput';

type PartParams = Omit<VoiceParams, CommonMessagePropKeys>

export const Voice = () => {
    const {t} = useTranslation('voice');
    const [params, setParams] = useState<PartParams>({});

    return <Message<PartParams>
        dispatchFn={sendVoice}
        FormAddons={<>
            <BoolInput<PartParams>
                label={t('xml')}
                setState={setParams}
                state={params}
                stateKey='xml'
            />
        </>}
        History={<VoiceHistory/>}
        ns='voice'
    />;
};