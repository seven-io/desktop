import Table from '@mui/material//Table'
import TableBody from '@mui/material//TableBody'
import TableCell from '@mui/material//TableCell'
import TableRow from '@mui/material//TableRow'
import TableContainer from '@mui/material/TableContainer'
import {CountryPricing} from '@seven.io/api'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {KeyValue} from '../../types'
import {CountryNetworks} from './CountryNetworks'

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

        <TableContainer sx={{marginBottom: '1em'}}>
            <Table size='small' aria-label={t('ariaLabels.network')}>
                <TableBody>
                    {
                        populationFields.map((o, i) => <TableRow key={i}>
                            <TableCell component='th' scope='row'>
                                {t(o.key)}
                            </TableCell>

                            <TableCell align='right'>
                                {o.value}
                            </TableCell>
                        </TableRow>)
                    }
                </TableBody>
            </Table>
        </TableContainer>

        <h3>{t('networks')}</h3>

        <CountryNetworks networks={pricing.networks}/>
    </>
}
