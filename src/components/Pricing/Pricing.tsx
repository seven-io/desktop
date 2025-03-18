import type {CountryPricing} from '@seven.io/client'
import {useTranslation} from 'react-i18next'
import type {KeyValue} from '../../types'
import {CountryNetworks} from './CountryNetworks'
import {Table, TableBody, TableCell, TableHeader, TableRow} from '../catalyst/table'

export type PricingProps = {
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
        <h2>{t('countryInformation')}</h2>

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

        <h3>{t('networks')}</h3>

        <CountryNetworks networks={pricing.networks}/>
    </>
}
