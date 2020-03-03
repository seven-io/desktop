import React, {SyntheticEvent, useEffect, useRef, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {red} from '@material-ui/core/colors';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import ClearIcon from '@material-ui/icons/Clear';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';

import {To} from '../To';
import {From} from '../From';
import {LocalStore} from '../../util/LocalStore';
import {sendSms} from '../../util/sendSms';
import {addSnackbar, setNav, setTo} from '../../store/actions';
import {MessageToolbar} from './MessageToolbar';
import {RootState} from '../../store/reducers';

const _red = red['900'];

export const Send = () => {
    const dispatch = useDispatch();
    const classes = makeStyles(theme => ({
        clear: {
            color: _red,
        },
        form: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
            },
        },
    }))();
    const [text, setText] = useState('');
    const [from, setFrom] = useState('');
    const {t} = useTranslation('send');
    const $textarea = useRef();
    const to = useSelector((state: RootState) => state.to);

    useEffect(() => {
        const apiKey = LocalStore.get('options.apiKey') as string;

        if ('' === apiKey || !apiKey) {
            dispatch(addSnackbar(t('pleaseSetApiKey')));

            dispatch(setNav('options'));
        }

        setDefaults();
    }, []);

    const handleClear = () => {
        setText('');

        setDefaults();
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        dispatch(addSnackbar(await sendSms({text, to, from})));
    };

    const setDefaults = () => {
        const signature = LocalStore.get('options.signature') as string;

        if (signature) {
            setText(signature);
        }

        setFrom(LocalStore.get('options.from') as string);

        setTo(LocalStore.get('options.to') as string);
    };

    return <form className={classes.form} onSubmit={handleSubmit}>
        <h1>{t('h1')}</h1>

        <MessageToolbar onAction={setText} textarea={$textarea.current!}/>

        <TextField
            fullWidth
            label={t('label')}
            helperText={t('helperText')}
            inputRef={$textarea}
            multiline
            onChange={ev => setText(ev.target.value)}
            required
            rows='3'
            value={text}
        />

        <To onChange={to => dispatch(setTo(to))} value={to}/>

        <From onChange={from => setFrom(from)} value={from}/>

        <Grid container>
            <Grid item xs={3}>
                <Button className={classes.clear} endIcon={<ClearIcon/>} fullWidth
                        onClick={handleClear} variant='outlined'>
                    {t('clear')}
                </Button>
            </Grid>

            <Grid item xs={9}>
                <Button color='primary' disabled={!text.length} endIcon={<SendIcon/>} fullWidth type='submit'
                        variant='outlined'>
                    {t('send')}
                </Button>
            </Grid>

        </Grid>
    </form>;
};