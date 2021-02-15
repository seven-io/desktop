import React from 'react';
import {useTranslation} from 'react-i18next';
import {Grid} from '@material-ui/core';
import {
    FOREIGN_ID_MAX_LENGTH,
    LABEL_MAX_LENGTH
} from 'sms77-client/dist/validators/request/sms';
import {TextInput} from '../TextInput';
import {BoolInput} from '../BoolInput';
import {SmsPartParams} from './Sms';

type SmsOptionsProps = {
    params: SmsPartParams
    setParams(params: SmsPartParams): void
}

export const SmsOptions = ({params, setParams}: SmsOptionsProps) => {
    const {t} = useTranslation('sms');

    return <>
        <BoolInput<SmsPartParams>
            label={t('debug')}
            setState={setParams}
            state={params}
            stateKey='debug'
        />

        <BoolInput<SmsPartParams>
            label={t('flash')}
            setState={setParams}
            state={params}
            stateKey='flash'
        />

        <BoolInput<SmsPartParams>
            label={t('noReload')}
            setState={setParams}
            state={params}
            stateKey='no_reload'
        />

        <BoolInput<SmsPartParams>
            label={t('performanceTracking')}
            setState={setParams}
            state={params}
            stateKey='performance_tracking'
        />

        {/*        <BoolInput<SmsPartParams>
            label={t('unicode')}
            setState={setParams}
            state={params}
            stateKey='unicode'
        />*/}

        <BoolInput<SmsPartParams>
            label={t('utf8')}
            setState={setParams}
            state={params}
            stateKey='utf8'
        />

        <Grid container spacing={3}>
            <Grid item xs={6}>
                <TextInput<SmsPartParams>
                    inputProps={{'maxLength': LABEL_MAX_LENGTH}}
                    label={t('label')}
                    setState={setParams}
                    state={params}
                    stateKey='label'
                />
            </Grid>
            <Grid item xs={6}>
                <TextInput<SmsPartParams>
                    inputProps={{'maxLength': FOREIGN_ID_MAX_LENGTH}}
                    label={t('foreignId')}
                    setState={setParams}
                    state={params}
                    stateKey='foreign_id'
                />
            </Grid>
            <Grid item xs={4}>
                <TextInput<SmsPartParams>
                    label={t('delay')}
                    setState={setParams}
                    state={params}
                    stateKey='delay'
                />
            </Grid>
            <Grid item xs={4}>
                <TextInput<SmsPartParams>
                    label={t('ttl')}
                    setState={setParams}
                    state={params}
                    stateKey='ttl'
                    type='number'
                />
            </Grid>
            <Grid item xs={4}>
                <TextInput<SmsPartParams>
                    label={t('udh')}
                    setState={setParams}
                    state={params}
                    stateKey='udh'
                />
            </Grid>
        </Grid>
    </>;
};