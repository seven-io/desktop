import React from 'react';
import {useTranslation} from 'react-i18next';
import MenuItem from '@material-ui/core/MenuItem';

import {PopupMenu} from '../PopupMenu';

export type MessageToolbarProps = {
    onClick: (label: string) => void
}

export const DateTimeUtils = ({onClick}: MessageToolbarProps) => {
    const {t} = useTranslation('send');

    return <PopupMenu buttonText='Date/Time' identifier='date-time'>
        <MenuItem onClick={() => onClick(Date.now().toString())}>
            {t('toolbar.timestamp')}
        </MenuItem>

        <MenuItem onClick={() => onClick(new Date().toString())}>
            {t('toolbar.date')}
        </MenuItem>

        <MenuItem onClick={() => onClick(new Date().toLocaleString())}>
            {t('toolbar.locale')}
        </MenuItem>

        <MenuItem
            onClick={() => onClick(new Date().toLocaleDateString())}>
            {t('toolbar.locale')} {t('toolbar.date')}
        </MenuItem>

        <MenuItem
            onClick={() => onClick(new Date().toLocaleTimeString())}>
            {t('toolbar.locale')} {t('toolbar.time')}
        </MenuItem>

        <MenuItem onClick={() => onClick(new Date().toDateString())}>
            {t('toolbar.date')}
        </MenuItem>

        <MenuItem onClick={() => onClick(new Date().toISOString())}>
            ISO {t('toolbar.date')}
        </MenuItem>

        <MenuItem onClick={() => onClick(new Date().toTimeString())}>
            {t('toolbar.time')}
        </MenuItem>

        <MenuItem onClick={() => onClick(new Date().toUTCString())}>
            UTC {t('toolbar.date')}
        </MenuItem>
    </PopupMenu>;
};