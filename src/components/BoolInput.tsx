import React from 'react';
import {FormControlLabel, Switch} from '@material-ui/core';
import {SwitchProps} from '@material-ui/core/Switch';
import {BaseInputProps} from '../types';

export type BoolInputProps<S> = SwitchProps & BaseInputProps<S>

export function BoolInput<S>({
                                 color = 'primary',
                                 label,
                                 setState,
                                 state,
                                 stateKey,
                                 ...props
                             }: BoolInputProps<S>) {
    return <FormControlLabel
        control={<Switch
            checked={state[stateKey] as unknown as boolean || false}
            color={color}
            onChange={e => setState({...state, [stateKey]: e.target.checked})}
            {...props}
        />}
        label={label}
    />;
}