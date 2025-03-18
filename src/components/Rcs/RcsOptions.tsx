import {format} from 'date-fns'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import localStore from '../../util/LocalStore'
import {RcsPartialProps} from '../../util/sendRcs'
import {Input} from '../catalyst/input'
import {Field, Label} from '../catalyst/fieldset'
import {Switch, SwitchField} from '../catalyst/switch'

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
        <SwitchField>
            <Label>{t('performanceTracking')}</Label>
            <Switch checked={params.performance_tracking}
                onChange={performance_tracking => setParams({...params, performance_tracking})}
            />
        </SwitchField>

        <div className='grid grid-cols-2'>
            <Field>
                <Label>{t('label')}</Label>
                <Input
                    //inputProps={{'maxLength': 100}}
                    //label={t('label')}
                    maxLength={100}
                    onChange={e => setParams({...params, label: e.target.value})}
                    //setState={setParams}
                   // state={params}
                   // stateKey='label'
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
                    //minDateTime={new Date}
                    min={new Date().toISOString()}
                    //InputLabelProps={{shrink: true}}
                    //inputVariant='outlined'
                   // label={t('delay')}
                    onChange={e => setParams({
                        ...params,
                        delay: e.target.value ? format(e.target.value, 'MM/dd/yyyy HH:MM') : undefined,
                    })}
                    type='datetime-local'
                    value={params.delay ? params.delay : ''}
                />
            </Field>

            {
                expertMode  && <Field>
                    <Label>{t('foreignId')}</Label>
                    <Input
                        //inputProps={{'maxLength': 64}}
                        //label={t('foreignId')}
                        maxLength={64}
                        onChange={e => setParams({...params, foreign_id: e.target.value})}
                        //setState={setParams}
                        //state={params}
                        //stateKey='foreign_id'
                        value={params.foreign_id}
                    />
                </Field>
            }
        </div>
    </>
}
