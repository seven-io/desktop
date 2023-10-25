import type {VoiceParams} from '@seven.io/api'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {sendVoice} from '../../util/sendVoice'
import {BoolInput} from '../BoolInput'
import {type CommonMessagePropKeys, Message} from '../Message/Message'
import {VoiceHistory} from './History'

type PartParams = Omit<VoiceParams, CommonMessagePropKeys>

export const Voice = () => {
    const {t} = useTranslation('voice')
    const [params, setParams] = useState<PartParams>({})

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
    />
}
