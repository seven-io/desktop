import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';

import {LocalStore} from '../../util/LocalStore';
import {setTo} from '../../store/actions';
import {ApiKey} from './ApiKey';
import {From} from '../From';
import {To} from '../To';
import {Signature} from './Signature';
import {IOptions} from './types';

export const Options = () => {
    const $apiKey = useRef();
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const classes = makeStyles(theme => ({
        root: {
            '& .MuiTextField-root, .MuiFormControl-root': {
                marginBottom: theme.spacing(3),
            },
        },
    }))();
    const [state, setState] = useState<IOptions>(LocalStore.get('options') as IOptions);

    useEffect(() => {
        !state.apiKey.length && ($apiKey.current! as HTMLInputElement).focus();
    }, []);

    const handleChange = ({target: {name, value}}: any) => {
        setState({...state, [name]: value});

        LocalStore.set(`options.${name}`, value);
    };

    return <>
        <h1>Options</h1>

        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <p>
                {t('optionsSavedAutomatically')}
            </p>

            <p>
                {t('markedFieldsRequired')}
            </p>
        </div>

        <form className={classes.root}>
            <ApiKey inputRef={$apiKey} onChange={handleChange} value={state.apiKey}/>

            <From onChange={from => handleChange({target: {name: 'from', value: from}})} value={state.from}/>

            <To onChange={to => {
                handleChange({target: {name: 'to', value: to}});

                dispatch(setTo(to));
            }} value={state.to}/>

            <Signature onChange={handleChange} signature={state.signature}/>
        </form>
    </>;
};