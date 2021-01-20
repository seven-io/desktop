import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {SmsParams} from 'sms77-client';
import {Grid} from '@material-ui/core';
import {
    FOREIGN_ID_MAX_LENGTH,
    LABEL_MAX_LENGTH
} from 'sms77-client/dist/validators/request/sms';
import {sendSms} from '../../util/sendSms';
import {History} from './History';
import {CommonMessagePropKeys, Message} from '../Message/Message';
import {TextInput} from '../TextInput';
import {BoolInput} from '../BoolInput';

type PartParams = Omit<SmsParams, CommonMessagePropKeys>

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
                label={t('performanceTracking')}
                setState={setParams}
                state={params}
                stateKey='performance_tracking'
            />

            <BoolInput<PartParams>
                label={t('unicode')}
                setState={setParams}
                state={params}
                stateKey='unicode'
            />

            <BoolInput<PartParams>
                label={t('utf8')}
                setState={setParams}
                state={params}
                stateKey='utf8'
            />

            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TextInput<PartParams>
                        inputProps={{'maxLength': LABEL_MAX_LENGTH}}
                        label={t('label')}
                        setState={setParams}
                        state={params}
                        stateKey='label'
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextInput<PartParams>
                        inputProps={{'maxLength': FOREIGN_ID_MAX_LENGTH}}
                        label={t('foreignId')}
                        setState={setParams}
                        state={params}
                        stateKey='foreign_id'
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextInput<PartParams>
                        label={t('delay')}
                        setState={setParams}
                        state={params}
                        stateKey='delay'
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextInput<PartParams>
                        label={t('ttl')}
                        setState={setParams}
                        state={params}
                        stateKey='ttl'
                        type='number'
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextInput<PartParams>
                        label={t('udh')}
                        setState={setParams}
                        state={params}
                        stateKey='udh'
                    />
                </Grid>
            </Grid>
        </>}
        History={<History/>}
        ns='sms'
        emoji={true}
    />;
};