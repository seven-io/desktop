import React, {SyntheticEvent, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import Sms77Client, {LookupType} from 'sms77-client';
import {LOOKUP_TYPES} from 'sms77-client/dist/constants/LOOKUP_TYPES';
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

import {addSnackbar, setBackdrop, setNav} from '../../store/actions';
import {LocalStore} from '../../util/LocalStore';
import {toString} from '../../util/toString';
import {TableRowSpreader} from '../TableRowSpreader';
import {BaseHistory} from '../BaseHistory/BaseHistory';
import {LookupResponse} from './types';

export const Lookup = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation('lookup');
    const [type, setType] = React.useState<LookupType>('format');
    const [number, setNumber] = React.useState('');
    const [historyTransKey, setHistoryTransKey] = React.useState<'response' | 'history'>('response');
    const classes = makeStyles((theme: Theme) => createStyles({
        formControl: {
            margin: theme.spacing(3),
        },
    }))();
    const apiKey = LocalStore.get('options.apiKey') as string;

    useEffect(() => {
        if ('' === apiKey || !apiKey) {
            dispatch(addSnackbar(t('pleaseSetApiKey', {ns: 'translation'})));

            dispatch(setNav('options'));
        }
    }, []);

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        dispatch(setBackdrop(true));
        const res = await (new Sms77Client(apiKey)).lookup({json: true, number, type}) as LookupResponse;
        dispatch(setBackdrop(false));
        setHistoryTransKey('response');

        LocalStore.append('lookups', res);

        dispatch(addSnackbar(getPairs(res).map(([k, v]) => `${t(k)}: ${toString(v)}`).join(' ● ')));
    };

    const getPairs = (res: LookupResponse) => Object.entries(res!).filter(([, v]) => null !== v);


    return <>
        <Grid alignItems='center' container justify='space-between'>
            <Grid item>
                <h1>{t('lookup')}</h1>
            </Grid>

            <Grid item>
                <Button color='primary' form='lookup' type='submit' disabled={0 === number.length} variant='outlined'>
                    {t('submit')}
                </Button>
            </Grid>
        </Grid>

        <Grid alignItems='center' component='form' container id='lookup' justify='space-between'
              onSubmit={handleSubmit}>
            <Grid item lg={4}>

                <FormControl component='fieldset' className={classes.formControl}>
                    <FormLabel component='legend'>{t('type')}</FormLabel>

                    <RadioGroup row style={{}} aria-label={t('type')} value={type}
                                onChange={e => setType((e.target as HTMLInputElement).value as LookupType)}>
                        {
                            Object.values(LOOKUP_TYPES)
                                .filter(v => !Number.isInteger(v as number))
                                .map((type, i) => <Tooltip key={i} title={t(`tooltips.${type}`)}>
                                    <FormControlLabel control={<Radio/>}
                                                      label={t(type as string)}
                                                      labelPlacement='bottom' value={type}/>
                                </Tooltip>)
                        }
                    </RadioGroup>
                </FormControl>
            </Grid>

            <Grid item lg={8}>
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

        <BaseHistory onNavigation={isCurrent => setHistoryTransKey(isCurrent ? 'response' : 'history')}
                     rowHandler={(row: LookupResponse, i: number) => <React.Fragment key={i}>
                         <TableRowSpreader nsKey={'lookup'} pairs={Object.entries(row)}/>
                     </React.Fragment>}
                     storeKey={'lookups'}
        />
    </>;
};