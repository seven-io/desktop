import React from 'react';
import {useTranslation} from 'react-i18next';
import {CountryPricing} from 'sms77-client';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material//Table';
import TableBody from '@mui/material//TableBody';
import TableRow from '@mui/material//TableRow';
import TableCell from '@mui/material//TableCell';
import {CountryNetworks} from './CountryNetworks';
import {KeyValue} from '../../types';

export type PricingProps = {
    pricing: CountryPricing
}

export const Pricing = ({pricing}: PricingProps) => {
    const {t} = useTranslation('pricing');

    const populationFields: KeyValue[] = [
        {key: 'code', value: pricing.countryCode},
        {key: 'name', value: pricing.countryName},
        {key: 'prefix', value: pricing.countryPrefix},
    ];

    return <>
        <h2>{t('countryInformation')}</h2>

        <TableContainer style={{marginBottom: '1em'}}>
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
    </>;
};
