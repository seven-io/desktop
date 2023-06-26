import {useTheme} from '@mui/material'
import React, {SyntheticEvent} from 'react';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {LookupParams} from 'sms77-client';
import {LookupType} from 'sms77-client/dist/constants/byEndpoint/lookup/LookupType';
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import {addSnackbar, setBackdrop} from '../../store/actions';
import {LocalStore} from '../../util/LocalStore';
import {toString} from '../../util/toString';
import {TableRowSpreader} from '../TableRowSpreader';
import {BaseHistory} from '../BaseHistory/BaseHistory';
import {LookupResponse} from './types';
import {initClient} from '../../util/initClient';

export const Lookup = () => {
    const theme = useTheme()
    const dispatch = useDispatch();
    const {t} = useTranslation('lookup');
    const [type, setType] = React.useState<LookupType>(LookupType.Format);
    const [number, setNumber] = React.useState('');
    const [historyTransKey, setHistoryTransKey] =
        React.useState<'response' | 'history'>('response');
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        dispatch(setBackdrop(true));
        const lookupParams: LookupParams = {
            json: true,
            number,
            type,
        };
        const res = await initClient().lookup(lookupParams) as LookupResponse;
        dispatch(setBackdrop(false));
        setHistoryTransKey('response');

        LocalStore.append('lookups', res);

        dispatch(addSnackbar(
            getPairs(res).map(([k, v]) => `${t(k)}: ${toString(v)}`)
                .join(' ● ')));
    };

    const getPairs = (res: LookupResponse) => {
        return Object.entries(res!).filter(([, v]) => null !== v);
    };

    return <>
        <Grid  container sx={{alignItems: 'center', justifyContent: 'space-between'}}>
            <Grid item>
                <h1>{t('lookup')}</h1>
            </Grid>

            <Grid item>
                <Button color='primary' form='lookup' type='submit'
                        disabled={0 === number.length} variant='outlined'>
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
                    <FormControl component='fieldset' sx={{
                        margin: theme.spacing(3),
                    }}>
                        <FormLabel component='legend'>{t('type')}</FormLabel>

                        <RadioGroup row style={{}} aria-label={t('type')} value={type}
                                    onChange={e => setType(e.target.value as LookupType)}>
                            {
                                Object.values(LookupType)
                                    .map((type, i) =>
                                        <Tooltip
                                            key={i}
                                            title={t(`tooltips.${type}`)}>
                                            <FormControlLabel control={<Radio/>}
                                                              label={t(type)}
                                                              labelPlacement='bottom'
                                                              value={type}/>
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
            rowHandler={(row: LookupResponse, i: number) => <React.Fragment key={i}>
                <TableRowSpreader nsKey={'lookup'} pairs={Object.entries(row)}/>
            </React.Fragment>}
            storeKey={'lookups'}
        />
    </>;
};
