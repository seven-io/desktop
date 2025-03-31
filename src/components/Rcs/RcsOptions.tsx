import {format} from 'date-fns'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import localStore from '../../util/LocalStore'
import {RcsPartialProps} from '../../util/sendRcs'
import {Input} from '../Input'
import {Field, Label} from '../Fieldset'
import {Switch, SwitchField} from '../Switch'

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
                    maxLength={100}
                    onChange={e => setParams({...params, label: e.target.value})}
                    value={params.label}
                />
            </Field>

            <Field>
                <Label>{t('delay')}</Label>
                <Input
                    min={format(new Date, 'yyyy-MM-ddTHH:mm')}
                    onChange={e => {
                        const date = new Date(e.target.value)
                        const formatted = format(date, 'MM/dd/yyyy HH:MM')

                        setParams({
                            ...params,
                            delay: e.target.value ? formatted : undefined,
                        })
                    }}
                    type='datetime-local'
                    value={params.delay ?  format(params.delay, 'yyyy-MM-dd\'T\'HH:mm').slice(0, 16) : ''}
                />
            </Field>

            {
                expertMode  && <Field>
                    <Label>{t('foreignId')}</Label>
                    <Input
                        maxLength={64}
                        onChange={e => setParams({...params, foreign_id: e.target.value})}
                        value={params.foreign_id}
                    />
                </Field>
            }
        </div>
    </>
}
