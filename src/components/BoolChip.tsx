import React from 'react';
import {useTranslation} from 'react-i18next';
import Chip from '@mui/material/Chip';

export type BoolChipProps = {
    value: boolean
}

export const BoolChip = ({value}: BoolChipProps) => {
    const {t} = useTranslation();

    return <Chip
        label={t(value.toString())}
        style={{backgroundColor: value ? 'green' : 'red', color: '#fff'}}
    />;
};
