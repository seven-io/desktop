import React from 'react';
import {useTranslation} from 'react-i18next';
import MenuItem from '@mui/material/MenuItem';
import {PopupMenu} from '../PopupMenu';

export type MessageToolbarProps = {
    onClick: (label: string) => void
}

export const DateTimeUtils = ({onClick}: MessageToolbarProps) => {
    const trans = useTranslation('message');
    const t = (k: string) => trans.t(`toolbar.${k}`);

    return <PopupMenu
        buttonText={`${t('date')}/${t('time')}`}
        identifier='date-time'
    >
        <MenuItem onClick={() => onClick(Date.now().toString())}>
            {t('timestamp')}
        </MenuItem>

        <MenuItem onClick={() => onClick(new Date().toString())}>
            {t('date')}
        </MenuItem>

        <MenuItem onClick={() => onClick(new Date().toLocaleString())}>
            {t('locale')}
        </MenuItem>

        <MenuItem
            onClick={() => onClick(new Date().toLocaleDateString())}>
            {t('locale')} {t('date')}
        </MenuItem>

        <MenuItem
            onClick={() => onClick(new Date().toLocaleTimeString())}>
            {t('locale')} {t('time')}
        </MenuItem>

        <MenuItem onClick={() => onClick(new Date().toDateString())}>
            {t('date')}
        </MenuItem>

        <MenuItem onClick={() => onClick(new Date().toISOString())}>
            ISO {t('date')}
        </MenuItem>

        <MenuItem onClick={() => onClick(new Date().toTimeString())}>
            {t('time')}
        </MenuItem>

        <MenuItem onClick={() => onClick(new Date().toUTCString())}>
            UTC {t('date')}
        </MenuItem>
    </PopupMenu>;
};
