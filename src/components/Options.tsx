import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';

import {LocalStore} from '../util/LocalStore';
import {ApiKey} from './ApiKey';
import {From} from './From';
import {To} from './To';
import {SignaturePosition} from './SignaturePosition';
import {Signature} from './Signature';
import {Configuration, defaultOptions} from '../util/defaultOptions';

export const Options = () => {
    const classes = makeStyles(theme => ({
        root: {
            '& .MuiTextField-root, .MuiFormControl-root': {
                marginBottom: theme.spacing(0),
            },
        },
    }))();

    const [state, setState] = useState<Configuration>(defaultOptions);

    const handleChange = ({target: {name, value}}: any) => {
        setState({...state, [name]: value});

        LocalStore.set(`options.${name}`, value);
    };

    useEffect(() => {
        setState(LocalStore.get('options') as Configuration);
    }, []);

    return <section>
        <h1>Options</h1>

        <p>
            All options are saved automatically after changing.<br/>
            Fields marked with a * are required.
        </p>

        <form className={classes.root}>
            <ApiKey onChange={handleChange} value={state.apiKey}/>

            <From onChange={from => handleChange({target: {name: 'from', value: from}})} value={state.from}/>

            <To onChange={to => handleChange({target: {name: 'to', value: to}})} value={state.to}/>

            <Signature onChange={handleChange} signature={state.signature}/>

            {/*<SignaturePosition onChange={handleChange} signaturePosition={state.signaturePosition}/>*/}
        </form>
    </section>;
};