import {LookupParams, LookupResource} from '@seven.io/client'
import {Fragment, type SyntheticEvent, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {initClient} from '../util/initClient'
import {toString} from '../util/toString'
import {BaseHistory} from '../components/BaseHistory/BaseHistory'
import {TableRowSpreader} from '../components/TableRowSpreader'
import type {LookupResponse} from '../components/Lookup/types'
import {SET_BACKDROP} from '../store/features/backdrop'
import {ADD_SNACKBAR} from '../store/features/snackbars'
import {useAppDispatch} from '../store'
import localStore from '../util/LocalStore'
import {Field, Fieldset, Label, Legend} from '../components/Fieldset'
import {Radio, RadioField, RadioGroup} from '../components/Radio'
import Tooltip from '../components/Tooltip'
import {Input} from '../components/Input'
import {Button} from '../components/Button'
import {Heading} from '../components/Heading'

const LOOKUP_TYPES = ['cnam', 'hlr', 'mnp', 'format', 'rcs'] as const;
type LookupTypeTuple = typeof LOOKUP_TYPES;
type LookupType = LookupTypeTuple[number];

export const Lookup = () => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation('lookup')
    const [type, setType] = useState<LookupType>('format')
    const [number, setNumber] = useState('')
    const [historyTransKey, setHistoryTransKey] = useState<'response' | 'history'>('response')
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        dispatch(SET_BACKDROP(true))
        const lookupParams: LookupParams = {
            numbers: [number],
        }
        const resource = new LookupResource(initClient())
        let res
        try {
            switch (type) {
                case 'cnam':
                    res = await resource.cnam(lookupParams)
                    break;
                case 'hlr':
                    res = await resource.hlr(lookupParams)
                    break;
                case 'mnp':
                    res = await resource.mnp(lookupParams)
                    break;
                case 'format':
                    res = await resource.format(lookupParams)
                    break;
                case 'rcs':
                    res = await resource.rcs(lookupParams)
                    break;

            }
        }
         catch (e) {
             res = null
             dispatch(ADD_SNACKBAR((e as Error).message))
         }
        dispatch(SET_BACKDROP(false))
        setHistoryTransKey('response')

        if (res) {
            localStore.set('lookups', [...localStore.get('lookups'), res])

            dispatch(ADD_SNACKBAR(getPairs(res).map(([k, v]) => `${t(k)}: ${toString(v)}`).join(' ● ')))
        }
    }

    const getPairs = (res: LookupResponse) => {
        return Object.entries(res).filter(([, v]) => null !== v) // TODO ?!
    }

    return <>
        <div className='grid grid-cols-2 justify-between items-center'>
            <Heading>{t('lookup')}</Heading>

            <Button
                color='green'
                disabled={0 === number.length}
                form='lookup'
                type='submit'
            >
                {t('submit')}
            </Button>
        </div>

        <form id='lookup' onSubmit={handleSubmit}>
            <div className='grid auto-cols-max grid-flow-col justify-between items-center'>
                <Fieldset>
                    <Legend>{t('type')}</Legend>

                    <RadioGroup
                        aria-label={t('type')}
                        value={type}
                        onChange={e => setType(e as LookupType)}
                    >
                        {
                            LOOKUP_TYPES
                                .map((type, i) => {
                                    return <RadioField key={i}>
                                        <Radio value={type} />
                                        <Tooltip title={t(`tooltips.${type}`)}>
                                            <Label>{t(type)}</Label>
                                        </Tooltip>
                                    </RadioField>
                                })
                        }
                    </RadioGroup>
                </Fieldset>

                <Field>
                    <Label>{t('number')}</Label>
                    <Input
                        onChange={ev => setNumber(ev.target.value)}
                        required
                        value={number}
                    />
                </Field>

            </div>
        </form>

        <Heading>{t(historyTransKey)}</Heading>

        <BaseHistory<LookupResponse>
            onNavigation={
                isCurrent => setHistoryTransKey(isCurrent ? 'response' : 'history')}
            rowHandler={(row: LookupResponse, i: number) => <Fragment key={i}>
                <TableRowSpreader nsKey={'lookup'} pairs={Object.entries(row)}/>
            </Fragment>}
            storeKey={'lookups'}
        />
    </>
}
