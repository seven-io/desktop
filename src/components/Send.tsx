import React, {useEffect, useRef, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {red} from '@material-ui/core/colors';
import {useDispatch} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {useTranslation} from 'react-i18next';

import {To} from './To';
import {From} from './From';
import {LocalStore} from '../util/LocalStore';
import {sendSms} from '../util/sendSms';
import {addSnackbar, setNav} from '../store/actions';
import {MessageToolbar} from './MessageToolbar';

export const Send = () => {
    const _red = red['900'];

    const classes = makeStyles(theme => ({
        clear: {
            color: _red,
            border: '1px solid ' + _red,
            marginRight: theme.spacing(1),
        },
        form: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
            },
        },
    }))();

    const [text, setText] = useState('');
    const [to, setTo] = useState('');
    const [from, setFrom] = useState('');
    const dispatch = useDispatch();
    const {t} = useTranslation('send');

    const setDefaults = () => {
        const signature = LocalStore.get('options.signature') as string;

        if (signature) {
            setText(signature);
        }

        setFrom(LocalStore.get('options.from') as string);

        setTo(LocalStore.get('options.to') as string);
    };

    useEffect(() => {
        const apiKey = LocalStore.get('options.apiKey') as string;

        if ('' === apiKey || !apiKey) {
            dispatch(setNav(1));
        }

        setDefaults();
    }, []);

    const onClear = () => {
        setText('');

        setDefaults();
    };

    const textarea = useRef();

    return <form className={classes.form} onSubmit={async e => {
        e.preventDefault();

        dispatch(addSnackbar(await sendSms({text, to, from})));
    }}>
        <h1>{t('Send SMS')}</h1>

        <MessageToolbar onAction={setText} textarea={textarea}/>

        <TextField
            fullWidth
            label={t('Message Content')}
            helperText={t('This defines the actual SMS content.')}
            inputRef={textarea}
            multiline
            onChange={ev => setText(ev.target.value)}
            required
            rows='3'
            value={text}
        />

        <To onChange={to => setTo(to)} value={to}/>

        <From onChange={from => setFrom(from)} value={from}/>

        <Grid container spacing={1}>
            <Grid item xs={6}>
                <Button variant='outlined' fullWidth className={classes.clear} onClick={onClear}>{t('Clear')}</Button>
            </Grid>

            <Grid item xs={6}>
                <Button variant='outlined' fullWidth color='primary' type='submit'>{t('Send')}</Button>
            </Grid>
        </Grid>
    </form>;
};