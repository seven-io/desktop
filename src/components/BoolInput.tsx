import React from 'react';
import {FormControlLabel, Switch} from '@material-ui/core';
import {SwitchProps} from '@material-ui/core/Switch';
import {BaseInputProps} from '../types';

export type BoolInputProps = SwitchProps & BaseInputProps<boolean, boolean>

export const BoolInput = ({
                              color = 'primary',
                              handleChange, label,
                              stateKey,
                              value = false,
                              ...props
                          }: BoolInputProps) =>
    <FormControlLabel
        control={<Switch
            checked={value}
            color={color}
            name={stateKey}
            onChange={e => handleChange(stateKey, e.target.checked)}
            {...props}
        />}
        label={label}
    />;