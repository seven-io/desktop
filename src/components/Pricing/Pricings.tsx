import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {CountryPricing, PricingResponseJson} from 'sms77-client';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Autocomplete from '@mui/material/Autocomplete';
import {useTranslation} from 'react-i18next';
import Table from '@mui/material/Table';
import TextField, {TextFieldProps} from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {LocalStore} from '../../util/LocalStore';
import {setBackdrop} from '../../store/actions';
import {CountryFlag} from '../CountryFlag';
import {Pricing} from './Pricing';
import {initClient} from '../../util/initClient';

export const Pricings = () => {
    const {t} = useTranslation('pricing');
    const [country, setCountry] = useState<CountryPricing | null>(null);
    const dispatch = useDispatch();
    const [pricing, setPricing] = useState(
        LocalStore.get<'pricing', PricingResponseJson>('pricing'));

    useEffect(() => {
        if (!pricing) {
            getAndStore()
                .then()
                .catch(console.error);
        }
    });

    const getAndStore = async () => {
        dispatch(setBackdrop(true));

        const pricing = await initClient()
            .pricing({format: 'json'}) as PricingResponseJson;

        dispatch(setBackdrop(false));

        LocalStore.set('pricing', pricing);

        setPricing(pricing);
    };

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
                    (['countCountries', 'countNetworks'] as (keyof PricingResponseJson)[])
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

        {pricing && <Autocomplete
            getOptionLabel={(o: CountryPricing) =>
                `${o.countryCode} ${o.countryName} ${o.countryPrefix}`}
            onChange={(ev: ChangeEvent<{}>, cP: CountryPricing | null) => setCountry(cP)}
            options={pricing.countries}
            renderOption={(p, o: CountryPricing) => <>
                <CountryFlag pricing={o}/>&nbsp;
                {` ${o.countryCode} ${o.countryName} ${o.countryPrefix}`}
            </>}
            renderInput={(params: TextFieldProps) => <TextField
                {...params}
                label={t('choose')}
                variant='outlined'
            />}
        />}

        {country && <Pricing pricing={country}/>}
    </>;
};
