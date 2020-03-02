import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {useTranslation} from 'react-i18next';
import {CountryPricing} from 'sms77-client';

import {CountryNetworks} from './CountryNetworks';

export type PricingProps = {
    pricing: CountryPricing
}

export const Pricing = ({pricing}: PricingProps) => {
    const {t} = useTranslation('pricing');

    return <TableContainer style={{marginBottom: '1em'}}>
        <Table size='small' aria-label={t('ariaLabels.network')}>
            <TableBody>
                <TableRow>
                    <TableCell component='th' scope='row'>
                        {t('code')}
                    </TableCell>

                    <TableCell align='right'>
                        {pricing.countryCode}
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell component='th' scope='row'>
                        {t('name')}
                    </TableCell>

                    <TableCell align='right'>
                        {pricing.countryName}
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell component='th' scope='row'>
                        {t('prefix')}
                    </TableCell>

                    <TableCell align='right'>
                        {pricing.countryPrefix}
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell component='th' scope='row'>
                        {t('networks')}
                    </TableCell>

                    <TableCell align='right'>
                        <CountryNetworks networks={pricing.networks}/>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>;
};