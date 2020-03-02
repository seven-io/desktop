import React, {useEffect, useState, useRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';

import {LocalStore} from '../util/LocalStore';
import {ApiKey} from './ApiKey';
import {From} from './From';
import {To} from './To';
import {Signature} from './Signature';
import {Configuration, defaultOptions} from '../util/defaultOptions';

export const Options = () => {
    const $apiKey = useRef();

    const {t} = useTranslation();

    const classes = makeStyles(theme => ({
        root: {
            '& .MuiTextField-root, .MuiFormControl-root': {
                marginBottom: theme.spacing(3),
            },
        },
    }))();

    const [state, setState] = useState<Configuration>(defaultOptions);

    const handleChange = ({target: {name, value}}: any) => {
        setState({...state, [name]: value});

        LocalStore.set(`options.${name}`, value);
    };

    useEffect(() => {
        const options = LocalStore.get('options') as Configuration;

        setState(options);

        if (!options.apiKey.length) {
            ($apiKey.current! as HTMLInputElement).focus();
        }
    }, []);

    return <section>
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

            <To onChange={to => handleChange({target: {name: 'to', value: to}})} value={state.to}/>

            <Signature onChange={handleChange} signature={state.signature}/>
        </form>
    </section>;
};