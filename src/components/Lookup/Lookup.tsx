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
import type {LookupParams} from '@seven.io/api'
import {LookupType} from '@seven.io/api/dist/constants/byEndpoint/lookup/LookupType'
import {Fragment, type SyntheticEvent, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch} from 'react-redux'
import {addSnackbar, setBackdrop} from '../../store/actions'
import {initClient} from '../../util/initClient'
import {LocalStore} from '../../util/LocalStore'
import {toString} from '../../util/toString'
import {BaseHistory} from '../BaseHistory/BaseHistory'
import {TableRowSpreader} from '../TableRowSpreader'
import type {LookupResponse} from './types'

export const Lookup = () => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const {t} = useTranslation('lookup')
    const [type, setType] = useState<LookupType>(LookupType.Format)
    const [number, setNumber] = useState('')
    const [historyTransKey, setHistoryTransKey] = useState<'response' | 'history'>('response')
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        dispatch(setBackdrop(true))
        const lookupParams: LookupParams = {
            json: true,
            number,
            type,
        }
        const res = await initClient().lookup(lookupParams) as LookupResponse
        dispatch(setBackdrop(false))
        setHistoryTransKey('response')

        LocalStore.append('lookups', res)

        dispatch(addSnackbar(
            getPairs(res).map(([k, v]) => `${t(k)}: ${toString(v)}`)
                .join(' ● ')))
    }

    const getPairs = (res: LookupResponse) => {
        return Object.entries(res!).filter(([, v]) => null !== v)
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
                                Object.values(LookupType)
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
