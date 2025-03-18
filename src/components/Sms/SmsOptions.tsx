import {format} from 'date-fns'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import type {SmsPartParams} from './Sms'
import localStore from '../../util/LocalStore'
import {Input} from '../catalyst/input'
import {Switch, SwitchField} from '../catalyst/switch'
import {Field, Label} from '../catalyst/fieldset'

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
        <SwitchField>
            <Label>{t('flash')}</Label>
            <Switch
                checked={params.flash}
                //label={t('flash')}
                onChange={(flash) => setParams({...params, flash})}
                //setState={setParams}
                //state={params}
                //stateKey='flash'
            />
        </SwitchField>

        <SwitchField>
            <Label>{t('performanceTracking')}</Label>
            <Switch
                checked={params.performance_tracking}
                //label={t('performanceTracking')}
                onChange={(performance_tracking) => setParams({...params, performance_tracking})}
                //setState={setParams}
                //state={params}
                //stateKey='performance_tracking'
            />
        </SwitchField>

        <div className='grid grid-cols-2'>
            <Field>
                <Label>{t('label')}</Label>
                <Input
                    //inputProps={{'maxLength': 100}}
                    //label={t('label')}
                    onChange={(e) => setParams({ ...params, label: e.target.value })}
                    maxLength={100}
                    //setState={setParams}
                   //state={params}
                    //stateKey='label'
                    value={params.label}
                />
            </Field>

            <Field>
                <Label>{t('delay')}</Label>
                <Input
                    //slotProps={{textField: {fullWidth: true}}}
                    //disablePast={true}
                    //format='yyyy-MM-dd hh:ii'
                    //fullWidth
                    min={new Date().toISOString()}
                    //InputLabelProps={{shrink: true}}
                    //inputVariant='outlined'
                    //label={t('delay')}
                    onChange={e => setParams({
                        ...params,
                        delay: e.target.value ? new Date(format(e.target.value, 'MM/dd/yyyy HH:MM')) : undefined,
                    })}
                    type='datetime-local'
                    value={params.delay ? params.delay.toISOString() : ''}
                />
            </Field>

            {
                expertMode && <>
                    <Field>
                        <Label>{t('foreignId')}</Label>
                        <Input
                            maxLength={64}
                            onChange={e => setParams({...params, foreign_id: e.target.value})}
                            value={params.foreign_id}
                        />
                    </Field>

                    <Field>
                        <Label>{t('ttl')}</Label>
                        <Input
                            min={0}
                            onChange={e => setParams({...params, ttl: Number.parseInt(e.target.value)})}
                            //shrink
                            type="number"
                            value={params.ttl}
                        />
                    </Field>

                    <Field>
                        <Label>{t('udh')}</Label>
                        <Input
                            onChange={e => setParams({...params, udh: e.target.value})}
                            //shrink
                            value={params.udh}
                        />
                    </Field>
                </>
            }
        </div>
    </>
}
