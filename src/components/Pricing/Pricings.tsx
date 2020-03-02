import React, {useEffect, useState, ChangeEvent} from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useTranslation} from 'react-i18next';
import Sms77Client, {CountryPricing, PricingResponse} from 'sms77-client';
import {useDispatch} from 'react-redux';
import Table from '@material-ui/core/Table';
import TextField, {TextFieldProps} from '@material-ui/core/TextField';

import {LocalStore} from '../../util/LocalStore';
import {addSnackbar, setNav} from '../../store/actions';
import {Pricing} from './Pricing';
import {CountryFlag} from '../CountryFlag';
import Button from '@material-ui/core/Button';

export const Pricings = () => {
    const {t} = useTranslation('pricing');
    const [country, setCountry] = useState<CountryPricing | null>(null);

    const dispatch = useDispatch();
    const apiKey = LocalStore.get('options.apiKey');

    useEffect(() => {
        if ('' === apiKey) {
            dispatch(addSnackbar(t('pleaseSetApiKey')));

            dispatch(setNav('options'));
        } else {
            getAndStore()
                .then()
                .catch(e => console.error(e));
        }
    }, []);

    const [pricing, setPricing] = useState<PricingResponse>(LocalStore.get('pricing') as PricingResponse);

    const getAndStore = async () => {
        let pricing = LocalStore.get('pricing') as PricingResponse;

        if (!Array.isArray(pricing.countries)) {
            const client = new Sms77Client(apiKey as string);

            pricing = await client.pricing({format: 'json'}) as PricingResponse;

            LocalStore.set('pricing', pricing);

            setPricing(pricing);
        }
    };

    return <>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h1 style={{display: 'inline-flex'}}>{t('pricing')}</h1>

            <Button onClick={() => getAndStore()}>
                {t('reload')}
            </Button>
        </div>

        <TableContainer style={{marginBottom: '2em'}}>
            <Table size='small' aria-label={t('ariaLabels.countryTable')}>
                <TableBody>
                    <TableRow>
                        <TableCell component='th' scope='row'>
                            {t('countCountries')}
                        </TableCell>

                        <TableCell align='right'>
                            {pricing.countCountries}
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell component='th' scope='row'>
                            {t('countNetworks')}
                        </TableCell>

                        <TableCell align='right'>
                            {pricing.countNetworks}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>

        <Autocomplete
            getOptionLabel={(o: CountryPricing) => `${o.countryCode} ${o.countryName} ${o.countryPrefix}`}
            onChange={(ev: ChangeEvent<{}>, cP: CountryPricing | null) => setCountry(cP)}
            options={pricing.countries}
            renderOption={(o: CountryPricing) => <>
                <CountryFlag pricing={o}/>&nbsp;{` ${o.countryCode} ${o.countryName} ${o.countryPrefix}`}</>}
            renderInput={(params: TextFieldProps) => <TextField
                {...params}
                label={t('choose')}
                variant='outlined'
            />}
        />

        {country && <Pricing pricing={country}/>}
    </>;
};