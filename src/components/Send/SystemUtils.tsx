import React from 'react';
import {useTranslation} from 'react-i18next';
import MenuItem from '@material-ui/core/MenuItem';

import {PopupMenu} from '../PopupMenu';
import {SYSTEM_PAIRS} from '../System';

export type MessageToolbarProps = {
    onClick: (label: string) => void
}

export const SystemUtils = ({onClick}: MessageToolbarProps) => {
    const {t} = useTranslation('system');

    const children = SYSTEM_PAIRS.map((p, i) =>
        <MenuItem key={i} onClick={() => onClick(p.value as string)}>
            {t(p.name)}
        </MenuItem>);

    return <PopupMenu buttonText='System' children={children} identifier='system'/>;
};