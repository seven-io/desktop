import React, {SyntheticEvent} from 'react';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {LookupParams} from 'sms77-client';
import {LookupType} from 'sms77-client/dist/constants/byEndpoint/lookup/LookupType';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {addSnackbar, setBackdrop} from '../../store/actions';
import {LocalStore} from '../../util/LocalStore';
import {toString} from '../../util/toString';
import {TableRowSpreader} from '../TableRowSpreader';
import {BaseHistory} from '../BaseHistory/BaseHistory';
import {LookupResponse} from './types';
import {initClient} from '../../util/initClient';

export const Lookup = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation('lookup');
    const [type, setType] = React.useState<LookupType>(LookupType.Format);
    const [number, setNumber] = React.useState('');
    const [historyTransKey, setHistoryTransKey] =
        React.useState<'response' | 'history'>('response');
    const classes = makeStyles((theme: Theme) => createStyles({
        formControl: {
            margin: theme.spacing(3),
        },
    }))();
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
        <Grid alignItems='center' container justify='space-between'>
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

        <Grid
            alignItems='center'
            component='form'
            container
            id='lookup'
            justify='space-between'
            onSubmit={handleSubmit}
        >
            <Grid item lg={12}>
                <FormControl component='fieldset' className={classes.formControl}>
                    <FormLabel component='legend'>{t('type')}</FormLabel>

                    <RadioGroup row style={{}} aria-label={t('type')} value={type}
                                onChange={e => setType(e.target.value as LookupType)}>
                        {
                            Object.values(LookupType)
                                .map((type, i) =>
                                    <Tooltip
                                        key={i}
                                        title={t<string>(`tooltips.${type}`)}>
                                        <FormControlLabel control={<Radio/>}
                                                          label={t<string>(type)}
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

        <h1>{t(historyTransKey)}</h1>

        <BaseHistory
            onNavigation={
                isCurrent => setHistoryTransKey(isCurrent ? 'response' : 'history')}
            rowHandler={(row: LookupResponse, i: number) => <React.Fragment key={i}>
                <TableRowSpreader nsKey={'lookup'} pairs={Object.entries(row)}/>
            </React.Fragment>}
            storeKey={'lookups'}
        />
    </>;
};