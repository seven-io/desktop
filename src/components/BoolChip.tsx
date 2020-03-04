import React from 'react';
import {useTranslation} from 'react-i18next';
import Chip from '@material-ui/core/Chip';

export type BoolChipProps = {
    value: boolean
}

export const BoolChip = ({value}: BoolChipProps) => {
    const {t} = useTranslation();

    return <Chip
        label={t(Boolean(value) ? 'true' : 'false')}
        style={{backgroundColor: value ? 'green' : 'red', color: '#fff'}}
    />;
};