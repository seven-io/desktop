import Grid from '@mui/material/Grid'
import {DateTimePicker} from '@mui/x-date-pickers-pro'
import {format} from 'date-fns'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {BoolInput} from '../BoolInput'
import {TextInput} from '../TextInput'
import localStore from '../../util/LocalStore'
import {RcsPartialProps} from '../../util/sendRcs'

type RcsOptionsProps = {
    params: RcsPartialProps
    setParams(params: RcsPartialProps): void
}

export const RcsOptions = ({params, setParams}: RcsOptionsProps) => {
    const {t} = useTranslation('rcs')
    const [expertMode, setExpertMode] = useState<boolean>(localStore.get('options.expertMode'))

    useEffect(() => {
        localStore.onDidChange('options', (options) => {
            options && setExpertMode(options.expertMode)
        })
    }, [])

    return <>
        <BoolInput<RcsPartialProps>
            label={t('performanceTracking')}
            setState={setParams}
            state={params}
            stateKey='performance_tracking'
        />

        <Grid container spacing={3}>
            <Grid item xs={6}>
                <TextInput<RcsPartialProps>
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
                        delay: date ? format(date, 'MM/dd/yyyy HH:MM') : undefined,
                    })}
                    value={params.delay ? new Date(params.delay) : null}
                />
            </Grid>

            {
                expertMode ? <>
                    <Grid item xs={5}>
                        <TextInput<RcsPartialProps>
                            inputProps={{'maxLength': 64}}
                            label={t('foreignId')}
                            setState={setParams}
                            state={params}
                            stateKey='foreign_id'
                        />
                    </Grid>
                </> : null
            }
        </Grid>
    </>
}
