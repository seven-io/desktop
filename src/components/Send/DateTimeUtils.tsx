import React from 'react';
import {useTranslation} from 'react-i18next';
import MenuItem from '@material-ui/core/MenuItem';

import {PopupMenu} from '../PopupMenu';

export type MessageToolbarProps = {
    onClick: (label: string) => void
}

export const DateTimeUtils = ({onClick}: MessageToolbarProps) => {
    const {t} = useTranslation('messageToolbar');

    return <PopupMenu buttonText='Date/Time' identifier='date-time'>
        <MenuItem onClick={() => onClick(Date.now().toString())}>
            {t('timestamp')}&nbsp;<code>Date.now().toString()</code>
        </MenuItem>

        <MenuItem onClick={() => onClick(new Date().toString())}>
            {t('date')}&nbsp;<code>new Date().toString()</code>
        </MenuItem>

        <MenuItem onClick={() => onClick(new Date().toLocaleString())}>
            {t('locale')}&nbsp;<code>new Date().toLocaleString()</code>
        </MenuItem>

        <MenuItem
            onClick={() => onClick(new Date().toLocaleDateString())}>
            {t('locale')} {t('date')}&nbsp;<code>new Date().toLocaleDateString()</code>
        </MenuItem>

        <MenuItem
            onClick={() => onClick(new Date().toLocaleTimeString())}>
            {t('locale')} {t('time')}&nbsp;
            <code>new Date().toLocaleTimeString()</code>
        </MenuItem>

        <MenuItem onClick={() => onClick(new Date().toDateString())}>
            {t('date')}&nbsp;<code>new Date().toDateString()</code>
        </MenuItem>

        <MenuItem onClick={() => onClick(new Date().toISOString())}>
            ISO&nbsp;<code>new Date().toISOString()</code>
        </MenuItem>

        <MenuItem onClick={() => onClick(new Date().toTimeString())}>
            {t('time')}&nbsp;<code>new Date().toTimeString()</code>
        </MenuItem>

        <MenuItem onClick={() => onClick(new Date().toUTCString())}>
            UTC&nbsp;<code>new Date().toUTCString()</code>
        </MenuItem>
    </PopupMenu>;
};