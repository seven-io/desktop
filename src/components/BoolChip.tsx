import Chip from '@material-ui/core/Chip';
import React from 'react';
import {useTranslation} from 'react-i18next';

export type BoolChipProps = {
    value: boolean
}

export const BoolChip = ({value}: BoolChipProps) => {
    const {t} = useTranslation();

    return <Chip style={{backgroundColor: value ? 'green' : 'red', color: '#fff'}}
                 label={t(Boolean(value) ? 'true' : 'false')}/>;
};