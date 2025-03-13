import Box from '@mui/material/Box'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import {CountryPricing, PricingResource, PricingResponse} from '@seven.io/client'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch} from 'react-redux'
import {initClient} from '../../util/initClient'
import {CountryFlag} from '../CountryFlag'
import {Pricing} from './Pricing'
import {SET_BACKDROP} from '../../store/features/backdrop'
import localStore from '../../util/LocalStore'

export const Pricings = () => {
    const {t} = useTranslation('pricing')
    const [country, setCountry] = useState<CountryPricing | null>(null)
    const dispatch = useDispatch()
    const [pricing, setPricing] = useState(
        localStore.get<'pricing', PricingResponse>('pricing'))

    useEffect(() => {
        if (!pricing) {
            getAndStore()
                .then()
                .catch(console.error)
        }
    }, [])

    const getAndStore = async () => {
        dispatch(SET_BACKDROP(true))

        const pricing = await (new PricingResource(initClient())).get()

        dispatch(SET_BACKDROP(false))

        localStore.set('pricing', pricing)

        setPricing(pricing)
    }

    return <>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h1 style={{display: 'inline-flex'}}>{t('pricing')}</h1>

            <Button onClick={() => getAndStore()}>
                {t('reload')}
            </Button>
        </div>

        <TableContainer style={{marginBottom: '2em'}}>
            <Table aria-label={t('ariaLabels.countryTable')} size='small'>
                <TableBody>
                    {pricing &&
                        ([
                            'countCountries',
                            'countNetworks',
                        ] as (keyof PricingResponse)[])
                            .map((o, i) => <TableRow key={i}>
                                <TableCell component='th' scope='row'>
                                    {t(o)}
                                </TableCell>

                                <TableCell align='right'>
                                    {pricing[o].toString()}
                                </TableCell>
                            </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>

        {pricing && <Autocomplete<CountryPricing>
            getOptionLabel={o =>
                `${o.countryCode} ${o.countryName} ${o.countryPrefix}`}
            onChange={(_ev, cP: CountryPricing | null) => setCountry(cP)}
            options={pricing.countries}
            renderOption={(p, o) => <Box component='li' {...p} key={o.countryCode}>
                <CountryFlag pricing={o}/>&nbsp;
                {` ${o.countryCode} ${o.countryName} ${o.countryPrefix}`}
            </Box>}
            renderInput={params => <TextField
                {...params}
                label={t('choose')}
                variant='outlined'
            />}
        />}

        {country && <Pricing pricing={country}/>}
    </>
}
