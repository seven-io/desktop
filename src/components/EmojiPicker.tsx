import MenuItem from '@material-ui/core/MenuItem';
import Picker, {IEmojiPickerProps} from 'emoji-picker-react';
import React from 'react';

import {PopupMenu} from './PopupMenu';

export type EmojiPickerProps = IEmojiPickerProps

export const EmojiPicker = (props: EmojiPickerProps) => <PopupMenu buttonText='Emoji' items={
    <MenuItem>
        <Picker {...props} />
    </MenuItem>
} identifier='emoji'/>;