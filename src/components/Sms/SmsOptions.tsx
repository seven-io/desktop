import Grid from '@mui/material/Grid'
import {DateTimePicker} from '@mui/x-date-pickers-pro'
import {format} from 'date-fns'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {BoolInput} from '../BoolInput'
import {TextInput} from '../TextInput'
import type {SmsPartParams} from './Sms'
import localStore from '../../util/LocalStore'

type SmsOptionsProps = {
    params: SmsPartParams
    setParams(params: SmsPartParams): void
}

export const SmsOptions = ({params, setParams}: SmsOptionsProps) => {
    const {t} = useTranslation('sms')
    const [expertMode, setExpertMode] = useState<boolean>(localStore.get('options.expertMode'))

    useEffect(() => {
        localStore.onDidChange('options', (options) => {
            options && setExpertMode(options.expertMode)
        })
    }, [])

    return <>
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
                    inputProps={{'maxLength': 100}}
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
                        delay: date ? new Date(format(date, 'MM/dd/yyyy HH:MM')) : undefined,
                    })}
                    value={params.delay ? new Date(params.delay) : null}
                />
            </Grid>

            {
                expertMode ? <>
                    <Grid item xs={5}>
                        <TextInput<SmsPartParams>
                            inputProps={{'maxLength': 64}}
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
