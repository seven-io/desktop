import {CountryPricing, PricingResource, PricingResponse} from '@seven.io/client'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch} from 'react-redux'
import {initClient} from '../util/initClient'
import {Pricing} from '../components/Pricing/Pricing'
import {SET_BACKDROP} from '../store/features/backdrop'
import localStore from '../util/LocalStore'
import {Button} from '../components/Button'
import {Table, TableBody, TableCell, TableHeader, TableRow} from '../components/Table'
import {Heading} from '../components/Heading'
import CountryPicker from '../components/Pricing/CountryPicker'

export const Pricings = () => {
    const {t} = useTranslation('pricing')
    const [country, setCountry] = useState<CountryPricing | null>(null)
    const dispatch = useDispatch()
    const [pricing, setPricing] = useState(localStore.get<'pricing', PricingResponse>('pricing'))

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
        <div className='flex justify-between'>
            <Heading className='inline-flex'>{t('pricing')}</Heading>
            <Button onClick={() => getAndStore()}>{t('refresh')}</Button>
        </div>

        <Table className='mb-4' aria-label={t('ariaLabels.countryTable')}>
            <caption>{t('ariaLabels.countryTable')}</caption>
            <TableBody>
                {pricing &&
                    ([
                        'countCountries',
                        'countNetworks',
                    ] as (keyof PricingResponse)[])
                        .map((o, i) => <TableRow key={i}>
                            <TableHeader scope='row'>{t(o)}</TableHeader>
                            <TableCell align='right'>{pricing[o].toString()}</TableCell>
                        </TableRow>)}
            </TableBody>
        </Table>

        {pricing && <CountryPicker onChange={setCountry} countries={pricing.countries} value={country} />}

        {country && <Pricing pricing={country}/>}
    </>
}
