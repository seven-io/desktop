import {useTheme} from '@mui/material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import {LookupParams, LookupResource} from '@seven.io/client'
import {Fragment, type SyntheticEvent, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {initClient} from '../../util/initClient'
import {toString} from '../../util/toString'
import {BaseHistory} from '../BaseHistory/BaseHistory'
import {TableRowSpreader} from '../TableRowSpreader'
import type {LookupResponse} from './types'
import {SET_BACKDROP} from '../../store/features/backdrop'
import {ADD_SNACKBAR} from '../../store/features/snackbars'
import {useAppDispatch} from '../../store'
import localStore from '../../util/LocalStore'

const LOOKUP_TYPES = ['cnam', 'hlr', 'mnp', 'format', 'rcs'] as const;
type LookupTypeTuple = typeof LOOKUP_TYPES;
export type LookupType = LookupTypeTuple[number];

export const Lookup = () => {
    const theme = useTheme()
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
        const client = initClient()
        const resource = new LookupResource(client)
        let res
        switch (type) {
            case "cnam":
                res = await resource.cnam(lookupParams)
                break;
            case "hlr":
                res = await resource.hlr(lookupParams)
                break;
            case "mnp":
                res = await resource.mnp(lookupParams)
                break;
            case "format":
                res = await resource.format(lookupParams)
                break;
            case "rcs":
                res = await resource.rcs(lookupParams)
                break;

        }
        dispatch(SET_BACKDROP(false))
        setHistoryTransKey('response')

        localStore.set('lookups', [...localStore.get('lookups'), res])

        dispatch(ADD_SNACKBAR(getPairs(res).map(([k, v]) => `${t(k)}: ${toString(v)}`).join(' ● ')))
    }

    const getPairs = (res: LookupResponse) => {
        return Object.entries(res).filter(([, v]) => null !== v) // TODO ?!
    }

    return <>
        <Grid container sx={{alignItems: 'center', justifyContent: 'space-between'}}>
            <Grid item>
                <h1>{t('lookup')}</h1>
            </Grid>

            <Grid item>
                <Button
                    color='primary' form='lookup' type='submit'
                    disabled={0 === number.length} variant='outlined'
                >
                    {t('submit')}
                </Button>
            </Grid>
        </Grid>

        <form id='lookup' onSubmit={handleSubmit}>
            <Grid
                container
                sx={{alignItems: 'center', justifyContent: 'space-between'}}
            >
                <Grid item lg={12}>
                    <FormControl
                        component='fieldset' sx={{
                        margin: theme.spacing(3),
                    }}
                    >
                        <FormLabel component='legend'>{t('type')}</FormLabel>

                        <RadioGroup
                            row style={{}} aria-label={t('type')} value={type}
                            onChange={e => setType(e.target.value as LookupType)}
                        >
                            {
                                LOOKUP_TYPES
                                    .map((type, i) =>
                                        <Tooltip
                                            key={i}
                                            title={t(`tooltips.${type}`)}
                                        >
                                            <FormControlLabel
                                                control={<Radio/>}
                                                label={t(type)}
                                                labelPlacement='bottom'
                                                value={type}
                                            />
                                        </Tooltip>)
                            }
                        </RadioGroup>
                    </FormControl>

                    <TextField
                        fullWidth
                        label={t('number')}
                        onChange={ev => setNumber(ev.target.value)}
                        required
                        value={number}
                    />
                </Grid>
            </Grid>
        </form>

        <h1>{t(historyTransKey)}</h1>

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
