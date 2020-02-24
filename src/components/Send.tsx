import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import {To} from './To';
import {From} from './From';
import {LocalStore} from '../util/LocalStore';
import {sendSms} from '../util/sendSms';

export const Send = () => {
    const classes = makeStyles(theme => ({
        form: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
            },
        },
    }))();

    const [text, setText] = useState('');
    const [to, setTo] = useState('');
    const [from, setFrom] = useState('');

    const setDefaults = () => {
        const signature = LocalStore.get('options.signature') as string;

        if (signature) {
            setText(signature);
        }

        setFrom(LocalStore.get('options.from') as string);

        setTo(LocalStore.get('options.to') as string);
    };

    useEffect(() => {
        setDefaults();
    }, []);

    const onClear = () => {
        setText('');

        setDefaults();
    };

    return <form className={classes.form} onSubmit={async e => {
        e.preventDefault();

        await sendSms({text, to, from});
    }}>
        <h1>Send SMS</h1>

        <TextField
            fullWidth
            label='Message Content'
            helperText='This defines the actual SMS content.'
            multiline
            onChange={ev => setText(ev.target.value)}
            required
            rows='3'
            value={text}
        />

        <To onChange={to => setTo(to)} value={to}/>

        <From onChange={from => setFrom(from)} value={from}/>

        <ButtonGroup
            fullWidth
            color="primary"
            aria-label="Send SMS action button group"
        >
            <Button variant='outlined' color='secondary' type='button' onClick={onClear}>Clear</Button>

            <Button variant='outlined' color='primary' type='submit'>Send</Button>
        </ButtonGroup>
    </form>;
};