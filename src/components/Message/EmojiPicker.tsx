import React from 'react';
import {useTranslation} from 'react-i18next';
import Picker, {Props} from 'emoji-picker-react';
import MenuItem from '@mui/material/MenuItem';
import {PopupMenu} from '../PopupMenu';

export const EmojiPicker = (props: Props) => <PopupMenu
    buttonText={useTranslation('message').t('toolbar.emoji')}
    identifier='emoji'
>
    <MenuItem>
        <Picker {...props} />
    </MenuItem>
</PopupMenu>;
