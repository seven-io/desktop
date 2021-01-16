import React, {ReactNode, SyntheticEvent, useEffect, useRef, useState} from 'react';
import Sms77Client, {SmsParams, VoiceParams} from 'sms77-client';
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
import {LocalStore} from '../../util/LocalStore';
import {getOpts, SendSmsProps} from '../../util/sendSms';
import {addSnackbar, setBackdrop, setNav, setTo} from '../../store/actions';
import {RootState} from '../../store/reducers';
import {MessageToolbar, MessageToolbarProps} from './MessageToolbar';
import {notify} from '../../util/notify';

export type CommonMessagePropKeys = 'from' | 'text' | 'to'
export type CommonMessageProps = Pick<SmsParams, CommonMessagePropKeys>
export type MessageDispatchProps<T> = T & CommonMessageProps

export type DispatchProps<T> = {
    client: Sms77Client
    options: SmsParams | VoiceParams
}

export type MessageProps<T> = {
    dispatchFn(p: DispatchProps<T>): Promise<string>
    History: ReactNode
    ns: string,
    ToolbarAddons?: (p: MessageToolbarProps) => JSX.Element
}

export type MessageTranslations = {
    h1: string
}

export function Message<T>({dispatchFn, History, ns, ToolbarAddons}: MessageProps<T>) {
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
    const {t} = useTranslation(['message', ns]);
    const $textarea = useRef();
    const to = useSelector((state: RootState) => state.to);

    useEffect(() => {
        const apiKey = LocalStore.get('options.apiKey', '');

        if ('' === apiKey || !apiKey) {
            dispatch(addSnackbar(t('pleaseSetApiKey', {ns: 'translation'})));

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

        dispatch(setBackdrop(true));
        const props: SendSmsProps = {text, to, from};
        const errors = [];
        const apiKey = LocalStore.get('options.apiKey', '');

        if ('' === apiKey) {
            errors.push('API key missing!');
        } else {
            if (!props.to.length) {
                props.to = LocalStore.get('options.to');
            }
            if (props.from && !props.from.length) {
                props.from = LocalStore.get('options.from');
            }
        }

        if (errors.length) {
            errors.unshift('Error(s) while validation:');
            const notification = errors.join('\n');
            await notify(notification);
            return dispatch(addSnackbar(notification));
        }

        dispatch(addSnackbar(await dispatchFn({
            client: new Sms77Client(apiKey, 'Desktop'),
            options: getOpts(props.text, props.to, props.from),
        })));
        dispatch(setBackdrop(false));
    };

    const setDefaults = () => {
        const signature = LocalStore.get('options.signature', '');

        if (signature) {
            setText(signature);
        }

        setFrom(LocalStore.get('options.from', ''));

        setTo(LocalStore.get('options.to', ''));
    };

    const toolbarProps: MessageToolbarProps = {
        onAction: setText,
        textarea: $textarea.current!,
    };
    if (ToolbarAddons) {
        toolbarProps.Addons = <ToolbarAddons {...toolbarProps} />;
    }

    return <>
        <h1>{t(`${ns}:h1`)}</h1>

        <form className={classes.form} onSubmit={handleSubmit}>
            <MessageToolbar {...toolbarProps} />

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

                <Grid item xs={1}/>

                <Grid item xs={8}>
                    <Button color='primary' disabled={!text.length} endIcon={<SendIcon/>}
                            fullWidth type='submit'
                            variant='outlined'>
                        {t('send')}
                    </Button>
                </Grid>
            </Grid>
        </form>

        {History}
    </>;
};