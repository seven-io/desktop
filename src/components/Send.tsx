import React, {useEffect, useRef, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {red} from '@material-ui/core/colors';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import ClearIcon from '@material-ui/icons/Clear';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';

import {To} from './To';
import {From} from './From';
import {LocalStore} from '../util/LocalStore';
import {sendSms} from '../util/sendSms';
import {addSnackbar, setNav} from '../store/actions';
import {MessageToolbar} from './MessageToolbar';

export const Send = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const apiKey = LocalStore.get('options.apiKey') as string;

        if ('' === apiKey || !apiKey) {
            dispatch(addSnackbar(t('pleaseSetApiKey')));

            dispatch(setNav('options'));
        }

        setDefaults();
    }, []);

    const _red = red['900'];

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
    const [to, setTo] = useState('');
    const [from, setFrom] = useState('');
    const {t} = useTranslation('send');
    const $textarea = useRef();

    const onClear = () => {
        setText('');

        setDefaults();
    };

    const setDefaults = () => {
        const signature = LocalStore.get('options.signature') as string;

        if (signature) {
            setText(signature);
        }

        setFrom(LocalStore.get('options.from') as string);

        setTo(LocalStore.get('options.to') as string);
    };

    return <form className={classes.form} onSubmit={async e => {
        e.preventDefault();

        dispatch(addSnackbar(await sendSms({text, to, from})));
    }}>
        <h1>{t('Send SMS')}</h1>

        <MessageToolbar onAction={setText} textarea={$textarea.current!}/>

        <TextField
            fullWidth
            label={t('Message Content')}
            helperText={t('This defines the actual SMS content.')}
            inputRef={$textarea}
            multiline
            onChange={ev => setText(ev.target.value)}
            required
            rows='3'
            value={text}
        />

        <To onChange={to => setTo(to)} value={to}/>

        <From onChange={from => setFrom(from)} value={from}/>

        <ButtonGroup fullWidth variant='contained'>
            <IconButton aria-label={t('Clear')} className={classes.clear} onClick={onClear}>
                <ClearIcon/>
            </IconButton>

            <Button color='primary' disabled={!text.length} type='submit'>
                {t('Send')}
            </Button>
        </ButtonGroup>
    </form>;
};