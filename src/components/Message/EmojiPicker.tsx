import React from 'react';
import {useTranslation} from 'react-i18next';
import Picker, {IEmojiPickerProps} from 'emoji-picker-react';
import MenuItem from '@material-ui/core/MenuItem';
import {PopupMenu} from '../PopupMenu';

export const EmojiPicker = (props: IEmojiPickerProps) => <PopupMenu
    buttonText={useTranslation('message').t('toolbar.emoji')}
    identifier='emoji'
>
    <MenuItem>
        <Picker {...props} />
    </MenuItem>
</PopupMenu>;