import Grid from '@mui/material/Grid'
import {DateTimePicker} from '@mui/x-date-pickers-pro'
import {FOREIGN_ID_MAX_LENGTH, LABEL_MAX_LENGTH} from '@seven.io/api/dist/validators/request/sms'
import {format} from 'date-fns'
import React, {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {LocalStore} from '../../util/LocalStore'
import {BoolInput} from '../BoolInput'
import {TextInput} from '../TextInput'
import {SmsPartParams} from './Sms'

type SmsOptionsProps = {
    params: SmsPartParams
    setParams(params: SmsPartParams): void
}

export const SmsOptions = ({params, setParams}: SmsOptionsProps) => {
    const {t} = useTranslation('sms')
    const [expertMode, setExpertMode] =
        useState<boolean>(LocalStore.get('options.expertMode'))

    useEffect(() => {
        LocalStore.onDidChange('options', options => {
            options && setExpertMode(options.expertMode)
        })
    }, [])

    return <>
        {
            expertMode ? <>
                {/*        <BoolInput<SmsPartParams>
            label={t('unicode')}
            setState={setParams}
            state={params}
            stateKey='unicode'
        />*/}

                {expertMode ? <BoolInput<SmsPartParams>
                    label={t('debug')}
                    setState={setParams}
                    state={params}
                    stateKey='debug'
                /> : null}

                {expertMode ? <BoolInput<SmsPartParams>
                    label={t('noReload')}
                    setState={setParams}
                    state={params}
                    stateKey='no_reload'
                /> : null}

                {expertMode ? <BoolInput<SmsPartParams>
                    label={t('utf8')}
                    setState={setParams}
                    state={params}
                    stateKey='utf8'
                /> : null}
            </> : null
        }

        <BoolInput<SmsPartParams>
            label={t('flash')}
            setState={setParams}
            state={params}
            stateKey='flash'
        />

        <BoolInput<SmsPartParams>
            label={t('performanceTracking')}
            setState={setParams}
            state={params}
            stateKey='performance_tracking'
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
                <DateTimePicker<Date>
                    slotProps={{textField: {fullWidth: true}}}
                    //disablePast={true}
                    //format='yyyy-MM-dd hh:ii'
                    //fullWidth
                    minDateTime={new Date}
                    //InputLabelProps={{shrink: true}}
                    //inputVariant='outlined'
                    label={t('delay')}
                    onChange={date => setParams({
                        ...params,
                        delay: date ? format(date, 'MM/dd/yyyy HH:MM') : undefined,
                    })}
                    value={params.delay ? new Date(params.delay) : null}
                />
            </Grid>

            {
                expertMode ? <>
                    <Grid item xs={5}>
                        <TextInput<SmsPartParams>
                            inputProps={{'maxLength': FOREIGN_ID_MAX_LENGTH}}
                            label={t('foreignId')}
                            setState={setParams}
                            state={params}
                            stateKey='foreign_id'
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <TextInput<SmsPartParams>
                            inputProps={{min: 0}}
                            label={t('ttl')}
                            setState={setParams}
                            shrink={true}
                            state={params}
                            stateKey='ttl'
                            type='number'
                        />
                    </Grid>

                    <Grid item xs={5}>
                        <TextInput<SmsPartParams>
                            label={t('udh')}
                            setState={setParams}
                            shrink={true}
                            state={params}
                            stateKey='udh'
                        />
                    </Grid>
                </> : null
            }
        </Grid>
    </>
}
