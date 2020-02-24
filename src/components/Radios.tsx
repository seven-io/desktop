import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export type RadiosProps = {
    entries: any
    onChange: any
    value: any
    label: any
    name: any
}

export const Radios = ({entries, onChange, value, label, name}: RadiosProps) =>
    <FormControl fullWidth component='fieldset' style={{textAlign: 'center'}}>
        <FormLabel style={{display: 'none'}} component='legend'
                   aria-label={label}>{label}</FormLabel>


        <RadioGroup aria-label={label}
                    name={name}
                    onChange={onChange}
                    value={value}>
            {entries.map(({value, label}: any) => <FormControlLabel labelPlacement="end" key={value}
                                                                    value={value} control={<Radio/>}
                                                                    label={label}/>)}
        </RadioGroup>
    </FormControl>;