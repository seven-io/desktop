import type {CountryPricing} from '@seven.io/client'
import {useTranslation} from 'react-i18next'
import type {KeyValue} from '../../types'
import {CountryNetworks} from './CountryNetworks'
import {Table} from '../Table/Table'
import {TableRow} from '../Table/TableRow'
import {TableHeader} from '../Table/TableHeader'
import {TableCell} from '../Table/TableCell'
import {TableBody} from '../Table/TableBody'

type PricingProps = {
    pricing: CountryPricing
}

export const Pricing = ({pricing}: PricingProps) => {
    const {t} = useTranslation('pricing')

    const populationFields: KeyValue[] = [
        {key: 'code', value: pricing.countryCode},
        {key: 'name', value: pricing.countryName},
        {key: 'prefix', value: pricing.countryPrefix},
    ]

    return <>
        <h2 className='dark:text-white'>{t('countryInformation')}</h2>

        <Table className='mb-4' aria-label={t('ariaLabels.network')}>
            <TableBody>
                {
                    populationFields.map((o, i) => <TableRow key={i}>
                        <TableHeader scope='row'>{t(o.key)}</TableHeader>
                        <TableCell align='right'>{o.value}</TableCell>
                    </TableRow>)
                }
            </TableBody>
        </Table>

        <h3 className='dark:text-white'>{t('networks')}</h3>

        <CountryNetworks networks={pricing.networks}/>
    </>
}
