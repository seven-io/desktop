import React, {ReactNode, SyntheticEvent, useEffect, useRef, useState} from 'react';
import SevenClient, {SmsParams, VoiceParams} from 'sms77-client';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ClearIcon from '@material-ui/icons/Clear';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';
import {To} from '../To';
import {From} from '../From';
import {LocalStore, localStoreDefaults} from '../../util/LocalStore';
import {getOpts, SendSmsProps} from '../../util/sendSms';
import {addSnackbar, setBackdrop, setTo} from '../../store/actions';
import {RootState} from '../../store/reducers';
import {Toolbar, ToolbarProps} from './Toolbar';
import {notify} from '../../util/notify';
import {initClient} from '../../util/initClient';

export type CommonMessagePropKeys = 'from' | 'text' | 'to' | 'json'
export type CommonMessageProps = Pick<SmsParams, CommonMessagePropKeys>
export type MessageDispatchProps<T> = T & CommonMessageProps

export type DispatchProps<T> = {
    client: SevenClient
    options: SmsParams | VoiceParams
}

export type MessageProps<T> = Pick<ToolbarProps, 'emoji'> & {
    dispatchFn(p: DispatchProps<T>): Promise<string>
    FormAddons?: ReactNode
    History: ReactNode
    ns: string
}

export type MessageTranslations = {
    h1: string
}

export function Message<T>(p: MessageProps<T>) {
    const dispatch = useDispatch();
    const classes = makeStyles(theme => ({
        clear: {
            color: 'red',
        },
        form: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
            },
        },
    }))();
    const [text, setText] = useState('');
    const [from, setFrom] = useState('');
    const to = useSelector((state: RootState) => state.to);
    const {t} = useTranslation(['message', p.ns]);
    const $textarea = useRef();
    const [expertMode, setExpertMode] =
        useState<boolean>(LocalStore.get('options.expertMode'));

    LocalStore.onDidChange('options', options => {
        options && setExpertMode(options.expertMode);
    });

    useEffect(() => {
        setDefaults();
    }, []);

    const handleClear = () => {
        setText('');

        setDefaults();
    };

    const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
        e.preventDefault();

        dispatch(setBackdrop(true));

        const props: SendSmsProps = {text, to, from};
        const errors = [];

        if (!props.to.length) {
            props.to = LocalStore.get('options.to');
        }

        if (props.from && !props.from.length) {
            props.from = LocalStore.get('options.from');
        }

        if (errors.length) {
            errors.unshift('Error(s) while validation:');

            const notification = errors.join('\n');
            await notify(notification);
            dispatch(addSnackbar(notification));

            return;
        }

        dispatch(addSnackbar(await p.dispatchFn({
            client: initClient(),
            options: {...getOpts(props.text, props.to, props.from), json: true},
        })));

        dispatch(setBackdrop(false));
    };

    const setDefaults = () => {
        const signature = LocalStore.get('options.signature', '');

        if (signature) {
            setText(signature);
        }

        setFrom(LocalStore.get('options.from', localStoreDefaults.options.from));

        setTo(LocalStore.get('options.to', localStoreDefaults.options.to));
    };

    return <>
        <h1>{t(`${p.ns}:h1`)}</h1>

        <form className={classes.form} onSubmit={handleSubmit}>
            {expertMode
                ? <Toolbar
                    emoji={p.emoji}
                    onAction={setText}
                    textarea={$textarea.current!}
                /> :
                null}

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
                variant='outlined'
            />

            <To onChange={to => dispatch(setTo(to))} value={to}/>

            <From onChange={setFrom} value={from}/>

            {p.FormAddons}

            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Button
                        className={classes.clear}
                        endIcon={<ClearIcon/>}
                        fullWidth
                        onClick={handleClear}
                        variant='outlined'
                    >
                        {t('clear')}
                    </Button>
                </Grid>

                <Grid item xs={8}>
                    <Button
                        color='primary'
                        disabled={!text.length}
                        endIcon={<SendIcon/>}
                        fullWidth type='submit'
                        variant='outlined'
                    >
                        {t('send')}
                    </Button>
                </Grid>
            </Grid>
        </form>

        {p.History}
    </>;
}
